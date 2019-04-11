import rsapi from 'runescape-api';
import admin from './firebase';

const db = admin.firestore();

async function main() {
  try {
    ['wh1tebird', 'zamorakyan'].forEach(async username => {
      const skills = (await rsapi.rs.hiscores.player(username)).skills;
      skills.timestamp = admin.firestore.Timestamp.fromDate(new Date());
      db.collection(username).add(skills);
      console.log('Added entry for ' + username);
    });
  } catch (e) {
    console.error('Error fetching data');
    console.error(e);
  }
}
main();
