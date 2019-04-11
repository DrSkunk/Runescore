import rsapi from 'runescape-api';
import admin from './firebase';

const db = admin.firestore();

async function main() {
  try {
    ['wh1tebird', 'zamorakyan'].forEach(async username => {
      const skills = (await rsapi.rs.hiscores.player(username)).skills;
      console.log(skills);
      skills.timestamp = Date.now();
      db.collection(username).add(skills);
    });
  } catch (e) {
    console.error('Error fetching data');
    console.error(e);
  }
}
main();
