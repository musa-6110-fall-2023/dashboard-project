import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

const pollingReq = await fetch('data/polling_places.geojson');
const pollingInfo = await pollingReq.json();

const events = new EventTarget();

initializeMap(pollingInfo, events);
initializeList(pollingInfo, events);
initializeSearch(pollingInfo, events);