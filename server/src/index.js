import rsapi from 'runescape-api';
import admin from './firebase';

const db = admin.firestore();

async function main() {
  try {
    const playerNames = [];
    (await db.collection('playerNames').get()).forEach(doc => {
      playerNames.push(doc.id);
    });

    console.log('Fetching skills data for players', playerNames);
    const skills = await Promise.all(
      playerNames.map(
        async playerName => (await rsapi.rs.hiscores.player(playerName)).skills
      )
    );
    const timestamp = admin.firestore.Timestamp.fromDate(new Date());

    Object.keys(skills[0]).forEach(skill => {
      const stats = { timestamp };
      const currentStats = {};
      for (
        let playerIndex = 0;
        playerIndex < playerNames.length;
        playerIndex++
      ) {
        const playerName = playerNames[playerIndex];

        stats[playerName] = {
          exp: skills[playerIndex][skill].exp,
          level: skills[playerIndex][skill].level,
          rank: skills[playerIndex][skill].rank
        };

        currentStats[playerName] = skills[playerIndex][skill];
      }
      db.collection('stats')
        .doc(skill)
        .set(currentStats, { merge: true });
      db.collection('stats')
        .doc(skill)
        .collection('stats')
        .add(stats);
    });
    console.log('Added entry');
  } catch (e) {
    console.error('Error processing data');
    console.error(e);
  }
}
main();
