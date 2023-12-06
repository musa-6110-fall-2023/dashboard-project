import {initializeeatsMap, showEatsOnMap} from './eats-map.js';
import {initializeFilters} from './eats-filters.js';

async function downloadRestaurants(onSuccess, onFailure) {
  // try {
    const resp = await fetch('data/Restaurants.geojson');
    if (resp.status === 200) {
      const data = await resp.json();
      onSuccess(data);
    }

}

const eventBus = new EventTarget();
const eatsMap = initializeeatsMap(eventBus);
function onRestaurantsLoad(data){
  showEatsOnMap(data.features, eatsMap);

 initializeFilters(data,eventBus);

// Make these variables globally available.

window.Restaurants = data;
window.eatsMap = eatsMap;

}



function mapRestaurants(){
  downloadRestaurants(onRestaurantsLoad);
}



mapRestaurants();