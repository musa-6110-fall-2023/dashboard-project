import { initializeMap } from './map.js';
import { setLeadLevel } from './chart.js';
import { initializeAddressEntry } from './address-input.js';
import { initializeList } from './park-list.js';
import { initializeParkEntry } from './park-input.js';

const phillyPark = await fetch('data/philly-park.json');
const parks = await phillyPark.json();

const soilLead = await fetch('data/soil-lead-2023-7.json');
const leadSamples = await soilLead.json();

const cityBoundary = await fetch('data/City_Limits.geojson');
const cityLimits = await cityBoundary.json();

// checkbox filtering
const parkCheckbox = document.querySelector(`#by-park`);
const addressCheckbox = document.querySelector(`#by-address`);
initializeAddressEntry();
parkCheckbox.addEventListener('change', () => {
  if (parkCheckbox.checked) {
    initializeParkEntry(parks, events);
  } else {
    console.log('parkCheckbox is unchecked');
  }
});
addressCheckbox.addEventListener('change', () => {
  if (addressCheckbox.checked) {
    initializeAddressEntry();
  } else {
    console.log('addressCheckbox is unchecked');
  }
});

// const parkCheckbox = document.querySelector(`#by-park`);
// const addressCheckbox = document.querySelector(`#by-address`);
// if (parkCheckbox.checked) {
//   initializeParkEntry(parks, events);
//   console.log('parks filter');
// } else {
//   initializeAddressEntry();
//   console.log('addresses filter');
// }

const events = new EventTarget(); // events object here is the event bus

// make things avaliable in every file
window.parks = parks;
window.leadSamples = leadSamples;
window.cityLimits = cityLimits;
window.parkMap = initializeMap(parks, leadSamples, cityLimits, events); // remember to add new layer her as well
window.setLeadLevel = setLeadLevel;
window.parkList = initializeList(parks);

