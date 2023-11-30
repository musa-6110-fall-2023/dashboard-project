import { initializeBizMap, addPointsToMap } from "./biz-map.js";
import { initializeList } from "./biz-list.js";


//click search button 
//add event listener and enter addresss, to lower case

const biz_search_Filter = document.querySelector('#biz-search-filter');
const pointList = document.querySelector('.point-list');
const addressChoiceList = document.querySelector('#biz-choices');






//fetch through and match the addresss list 
function initializeSearch(bizpoints) {
    document.getElementById('biz-search-button').addEventListener('click', () => bizSearch(bizpoints));
}


function bizSearch(bizpoints) {
    const input = biz_search_Filter.value.toLowerCase();
    const resultList = document.querySelector('#biz-choices');

    resultList.innerHTML = '';
    pointList.innerHTML = '';

    const features = [];
    for (const feature of bizpoints.features) {
        const businessName = feature.properties["Business"].toLowerCase();
        if (businessName.includes(input)) {
            features.push(feature)
        }
    }

    initializeList({features: features});

    // Display on the map
    addPointsToMap({features: features});

}

export {
    initializeSearch,
}