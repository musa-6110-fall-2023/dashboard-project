import { initializeMap } from './school-map.js';
import { initializeList } from './school-list.js';
import { initializeAddressEntry } from './address-entry.js';

// relatively new syntax for async function
const schoolsResp = await fetch('data/schools.json');
const schools = await schoolsResp.json();

window.map = initializeMap(schools);
initializeList(schools);
initializeAddressEntry(schools);

// what is done when use await fetch, same thing as above
// const promise1 = fetch('data/schools.json');
// promise1.then((schoolsResp) => {
//   const promise2 = schoolsResp.json();

//   promise2.then((schools) => {
//     initializeMap();
//   });
// });
