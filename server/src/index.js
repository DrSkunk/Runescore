import rsapi from 'runescape-api';
import admin from './firebase';

const db = admin.firestore();

async function main() {
  try {
    const wh1tebirdSkills = (await rsapi.rs.hiscores.player('wh1tebird'))
      .skills;
    const zamorakyanSkills = (await rsapi.rs.hiscores.player('zamorakyan'))
      .skills;
    const timestamp = admin.firestore.Timestamp.fromDate(new Date());

    Object.keys(wh1tebirdSkills).forEach(skill => {
      const stats = {
        wh1tebird: {
          exp: wh1tebirdSkills[skill].exp,
          level: wh1tebirdSkills[skill].level,
          rank: wh1tebirdSkills[skill].rank
        },
        zamorakyan: {
          exp: zamorakyanSkills[skill].exp,
          level: zamorakyanSkills[skill].level,
          rank: zamorakyanSkills[skill].rank
        },
        timestamp
      };
      db.collection('players')
        .doc(skill)
        .set(
          {
            wh1tebird: wh1tebirdSkills[skill].level,
            zamorakyan: zamorakyanSkills[skill].level
          },
          { merge: true }
        );
      db.collection('players')
        .doc(skill)
        .collection('stats')
        .add(stats);
    });

    console.log('Added entry');
  } catch (e) {
    console.error('Error fetching data');
    console.error(e);
  }
}
main();
