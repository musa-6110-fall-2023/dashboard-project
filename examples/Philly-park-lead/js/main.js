import { initializeMap } from './map.js';
import { setLeadLevel } from './chart.js';

const phillyPark = await fetch('data/philly-park.json');
const parks = await phillyPark.json();

window.parks = parks;
window.schoolMap = initializeMap(parks);
window.setLeadLevel = setLeadLevel;
