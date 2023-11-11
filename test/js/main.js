// main.js
import { initializeMap } from "./map.js";
import { initializeSearch } from "./search.js";

const placeInfoResp = await fetch('data/polling_places.geojson');
const placeInfo = await placeInfoResp.json();

const events = new EventTarget();

initializeMap(placeInfo, events);
initializeSearch(placeInfo, events);
