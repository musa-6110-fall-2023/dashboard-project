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
initializeSearch(bizpoints);

//dropdown



  
const dropdown = L.control({ position: 'topright' });

    dropdown.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'dropdown');
  
      div.innerHTML = '<button class="btn" id="filterButton">Filter</button>';
      div.querySelector('#filterButton').addEventListener('click', toggleDropdown);
      return div;
    };
  


function toggleDropdown() {
    const dropdownContent = document.getElementById("filterOptions");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }

  dropdown.addTo(map);