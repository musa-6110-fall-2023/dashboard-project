import { initializeBizMap } from "./biz-map.js";
import { initializeList } from "./biz-list.js";
import { initializeAddressFilter } from "./address-entry.js";
import { initFilters } from"./filter.js";
import { initializeSearch } from "./search.js";

const bizpointsResp = await fetch('data/union_sq.json');
const bizpoints = await bizpointsResp.json();

const map = initializeBizMap(bizpoints);
initializeList(bizpoints);
initializeAddressFilter();
initFilters(bizpoints, map);
initializeSearch();