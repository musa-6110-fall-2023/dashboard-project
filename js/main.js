// ==============================================================================> 1. Importing Modules
import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

// ==============================================================================> 2. Fetching data 
const stationInfoResp = await fetch('https://raw.githubusercontent.com/watsonva/MUSA_6110_story-map-project/main/philly_landmark.json');
const stationInfo = await stationInfoResp.json();

console.log(stationInfo)
// // original code 
// const stationInfoResp = await fetch('https://gbfs.bcycle.com/bcycle_indego/station_information.json');
// const stationInfo = await stationInfoResp.json();

// ==============================================================================> 3. Creating an event `bus`
const events = new EventTarget();

// ==============================================================================> 4. Initialize three imported models
const map = initializeMap(stationInfo, events);
initializeList(stationInfo, events);
initializeSearch(stationInfo, events);


// original code
// const map = initializeMap(stationInfo, events);
// initializeList(stationInfo, events);
// initializeSearch(stationInfo, events);


// ==============================================================================> 5. Getting Current Geolocation:
navigator.geolocation.getCurrentPosition(
  handleGeolocationSuccess,
  handleGeolocationError);


// ====================================================================> 5.1 re
function handleGeolocationSuccess(pos) {
  console.log(pos);
  
  // zoom into the user's current location
  const newEvent = new CustomEvent('geolocated', { detail: pos });
  events.dispatchEvent(newEvent);
}

// handling geolocation -- error, this is from Geolocation API
function handleGeolocationError(err) {
  console.log(err);
}


// ========================================================================================> ok7. Exposing the Map
window.map = map;
