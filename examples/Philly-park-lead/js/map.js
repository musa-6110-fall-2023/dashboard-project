import { calLeadStyle } from './map-style.js';

let phillyParkLayer = null;
let soilLayer = null;

function initializeMap(parks, leadSamples) { // remember to input all the layers specify below
  const map = L.map('map').setView([39.96, -75.15], 12);
  const baseTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/junyiy/clng7r3oq083901qx0eu9gaor/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbXMza292bjAxcXoybG1meHhuZ3N1cjYifQ.EYo5VECxk9-NCAEgc3dm9w');
  baseTileLayer.addTo(map);

  phillyParkLayer = L.geoJSON(parks);
  phillyParkLayer.addTo(map);

  soilLayer = L.geoJSON(leadSamples,
    {style: calLeadStyle,
      pointToLayer: (parks, latlng) => L.circleMarker(latlng), // just type latlng or any names and leaflet know how to find goejson's coordinate
      // Can also do the latlng manually, remember to flip the lon lat (leaflet and geojson read it in the opposite way)
      // pointToLayer: (parks) => L.circleMarker([parks.geometry.coordinates[1], parks.geometry.coordinates[0]]),
    });
  soilLayer.addTo(map);


  return map;
}


export {
  initializeMap,
};
