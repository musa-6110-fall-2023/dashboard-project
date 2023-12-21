// ==============================================================> 1.0 Import
import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

import { initIssueReporter } from './issue_reporter.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';


// ==============================================================> 2.0 Setup Variable
// ==> for data
const stationInfoResp = await fetch('https://raw.githubusercontent.com/watsonva/MUSA_6110_story-map-project/main/philly_landmark.json');
const stationInfo = await stationInfoResp.json();
console.log(stationInfo)

// ==> for event
const events = new EventTarget();

// ==> for map
const map = initializeMap(stationInfo, events); 
            initializeList(stationInfo, events); 
            initializeSearch(stationInfo, events);

// ==> for connection to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1-IpV8mRcLyXgsf3ZfDwhKJdizxkeQp4",
  authDomain: "js-hw3.firebaseapp.com",
  projectId: "js-hw3",
  storageBucket: "js-hw3.appspot.com",
  messagingSenderId: "746587643981",
  appId: "1:746587643981:web:b9fca0cbd0b9d46398bc04",
  measurementId: "G-FL2PCS07FK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const issuesCollection = await collection(db, 'trail_waze_issues');


// ==============================================================> 3.0 Setup Function: for issues
// ==> 3.1 Function 1: data loader
async function loadTrails() {
  const resp = await fetch('https://opendata.arcgis.com/datasets/48323d574068405bbf5336b9b5b29455_0.geojson');
  const data = await resp.json();
  const trailsLayer = L.geoJSON(data, {
    style: {
      weight: 6,
      opacity: 0,
    },
  });
  trailsLayer.bindTooltip(
    (l) => l.feature.properties['TRAIL_NAME'],
    { sticky: true },
  );
  trailsLayer.addTo(map);
  return trailsLayer;
}
// ==> 3.2 Function 2: issue loader
async function loadIssues() {
  const issuesQuery = await getDocs(issuesCollection);
  const issues = issuesQuery.docs.map((doc) => doc.data());

  const data = {
    type: 'FeatureCollection',
    features: issues,
  };
  console.log(data);

  const issuesLayer = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => {
      const icon = L.icon({
        iconUrl: `images/markers/${feature.properties.category}-marker.png`,
        iconSize: [35, 41],
        iconAnchor: [18, 41],
        shadowUrl: 'images/markers/marker-shadow.png',
        shadowSize: [35, 41],
        shadowAnchor: [13, 41],
      });
      return L.marker(latlng, { icon });
    },
  });
  issuesLayer.addTo(map);
  return issuesLayer;
}
// ==> 3.3 create two variables to receive outcomes
const [trailsLayer, issuesLayer] = await Promise.all([
  loadTrails(),
  loadIssues(),
]);


// ==============================================================> 4.0 Setup Function: for current location
navigator.geolocation.getCurrentPosition(
  handleGeolocationSuccess,
  handleGeolocationError);
// ==> 4.1 if success
function handleGeolocationSuccess(pos) {
  console.log(pos);
  const newEvent = new CustomEvent('geolocated', { detail: pos }); 
  events.dispatchEvent(newEvent);
}
// ==> 4.2 if error
function handleGeolocationError(err) {
  console.log(err);
}


// ==============================================================> 3.0 Get current location
initIssueReporter(map, trailsLayer, issuesLayer, issuesCollection);
window.map = map;
