import { initializeBizMap, addPointsToMap } from "./biz-map.js";
import { initializeList } from "./biz-list.js";


//click search button 
//add event listener and enter addresss, to lower case

const biz_search_Filter = document.querySelector('#biz-search-filter');
const addressChoiceList = document.querySelector('#biz-choices')
function initializeBizFilter() {
    addressFilter.addEventListener('input', handleAddressFilterChange)
}

document.getElementById('biz-search-button').addEventListener('click', initializeSearch);



//fetch through and match the addresss list 

function initializeSearch() {
    const input = document.getElementById('biz-search-filter').value.toLowerCase();
    const resultList = document.querySelector('#biz-results-list');

    resultList.innerHTML = '';
    pointList.innerHTML = '';

for (const point of filteredBusinesses) {
    const filteredFeatures = point.features.filter(feature => {
        const businessName = feature.properties["Business"].toLowerCase();
        return businessName.includes(input);
    });



//display in the list box
//display on the map 

  
      // Display in the list
      initializeList({ features: filteredFeatures });
  
      // Display on the map
      addPointsToMap(filteredFeatures);

    }

}
  

export{
    initializeSearch,
}