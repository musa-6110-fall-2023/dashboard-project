import { initializeMap } from './map.js';
import { initializeSearch } from './search.js';

const stadiumGeoJSON = await fetch('./data/stadium.geojson');
const stadiumInfo = await stadiumGeoJSON.json();

const events = new EventTarget();

initializeMap(stadiumInfo, events);
initializeSearch(stadiumInfo, events);