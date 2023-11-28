import { initializeMap } from './crimes-map.js';
import { initializeList } from './crimes-list.js';
import { initializeAddressEntry } from './address-entry.js';
import { initFilters } from './filters.js';

initFilters();
initializeMap("all");
initializeList("all");
initializeAddressEntry();
