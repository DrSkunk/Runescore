"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _runescapeApi = _interopRequireDefault(require("runescape-api"));

var _firebase = _interopRequireDefault(require("./firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = _firebase.default.firestore();

var data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
}; // Add a new document in collection "cities" with ID 'LA'

var setDoc = db.collection('cities').doc('LA').set(data);
main();

async function main() {
  try {
    // const res = await fetch('https://google.com');
    //   console.log(res);
    const skills = (await _runescapeApi.default.rs.hiscores.player('wh1tebird')).skills;
    console.log(skills);
  } catch (e) {
    console.error('Error fetching data');
    console.error(e);
  }
}

main();
setInterval(main, 5000);