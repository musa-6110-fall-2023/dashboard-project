
// ==============================================================> 1.0 Import
// 1.0 Import functions: from both local and Firebase SDK
// If need other SDKs library, click this: https://firebase.google.com/docs/web/setup#available-libraries
import { initIssueReporter } from './issue_reporter.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';


// ==============================================================> 2.0 Setup Variable
// ==> 2.1 Set Up:  a connection to Firebase
// Get configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1-IpV8mRcLyXgsf3ZfDwhKJdizxkeQp4",
  authDomain: "js-hw3.firebaseapp.com",
  projectId: "js-hw3",
  storageBucket: "js-hw3.appspot.com",
  messagingSenderId: "746587643981",
  appId: "1:746587643981:web:b9fca0cbd0b9d46398bc04",
  measurementId: "G-FL2PCS07FK"
};
// app
const app = initializeApp(firebaseConfig);
// instance
const db = getFirestore(app);
// reference
const issuesCollection = await collection(db, 'trail_waze_issues');

// ==> 2.2 set up map
const map = L.map('map').setView([39.95, -75.16], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mjumbe-test/cl1yh1ojk000014o5l2u4tiff/tiles/{tileSize}/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ==============================================================> 3.0 Setup Function
// ==> 3.1 Function 1: data loader
async function loadTrails() {
  // 3.1.1 fetch data
  // 3.1.2 store data
  // 3.1.3 create GeoJSON layer
  // 3.1.4 add tooltip to the layer
  // 3.1.5 add the layer to map
  // 3.1.6 return
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

// ==============================================================> 4.0 Report 4 variables:
// 1. map
// 2. trailsLayer
// 3. issuesLayer
// 4. issuesCollection
initIssueReporter(map, trailsLayer, issuesLayer, issuesCollection);