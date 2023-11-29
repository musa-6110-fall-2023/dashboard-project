import { initializeMap } from './map.js';
import { setLeadLevel } from './chart.js';
import { initializeAddressEntry } from './address-input.js';
import { initializeList } from './park-list.js';
import { initializeParkEntry } from './park-input.js';

const phillyPark = await fetch('data/philly-park.json');
const parks = await phillyPark.json();
parks.features.sort((a, b) => a.properties.ASSET_NAME.localeCompare(b.properties.ASSET_NAME));

const soilLead = await fetch('data/soil-lead-2023-7.json');
const leadSamples = await soilLead.json();

const cityBoundary = await fetch('data/City_Limits.geojson');
const cityLimits = await cityBoundary.json();

// make sure you call event bus before all the functions
const events = new EventTarget(); // events object here is the event bus

// checkbox filtering
const parkCheckbox = document.querySelector(`#by-park`);
const addressCheckbox = document.querySelector(`#by-address`);
initializeAddressEntry(events); // remember to add events in main as well
parkCheckbox.addEventListener('change', () => {
  if (parkCheckbox.checked) {
    initializeParkEntry(parks, events);
  } else {
    console.log('parkCheckbox is unchecked');
  }
});
addressCheckbox.addEventListener('change', () => {
  if (addressCheckbox.checked) {
    initializeAddressEntry(events);
  } else {
    console.log('addressCheckbox is unchecked');
  }
});

// const parkEntry = document.querySelector('#entry');
// const parkPopStyle = document.querySelector('.park-choices');
// const addressPopStyle = document.querySelector('.address-choices');
// if (parkEntry.value.toLowerCase() == ``) {
//   parkPopStyle.classList.add('hidden'); // add a hidden label to "remove", style hidden in CSS
//   addressPopStyle.classList.add('hidden');
// }


// make things avaliable in every file

window.parks = parks;
window.leadSamples = leadSamples;
window.cityLimits = cityLimits;
window.parkMap = initializeMap(parks, leadSamples, cityLimits, events); // remember to add new layer her as well
window.setLeadLevel = setLeadLevel;
window.parkList = initializeList(parks, events);

