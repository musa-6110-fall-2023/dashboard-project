import { calLeadStyle } from './map-style.js';
import { calParkStyle } from './map-style.js';

let phillyParkLayer = null;
let soilLayer = null;
let cityLayer = null;

function initializeMap(parks, leadSamples, cityLimits) { // remember to input all the layers specify below
  const map = L.map('map', {zoomSnap: 0}).setView([40.01, -75.15], 11); // zoomSnap 0 make the zoom level to real number
  const baseTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/junyiy/clng7r3oq083901qx0eu9gaor/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbXMza292bjAxcXoybG1meHhuZ3N1cjYifQ.EYo5VECxk9-NCAEgc3dm9w', {
    attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
  });
  baseTileLayer.addTo(map);

  phillyParkLayer = L.geoJSON(parks,
    {style: calParkStyle,
    });
  phillyParkLayer.addTo(map);

  soilLayer = L.geoJSON(leadSamples,
    {style: calLeadStyle,
      pointToLayer: (parks, latlng) => L.circleMarker(latlng), // just type latlng or any names and leaflet know how to find goejson's coordinate
      // Can also do the latlng manually, remember to flip the lon lat (leaflet and geojson read it in the opposite way)
      // pointToLayer: (parks) => L.circleMarker([parks.geometry.coordinates[1], parks.geometry.coordinates[0]]),
    });
  soilLayer.addTo(map);

  cityLayer = L.geoJSON(cityLimits,
    { stroke: true,
      fill: false,
      color: '#446E5F',
      dashArray: '5 6',
      weight: 2,
    });
  cityLayer.addTo(map);

  map.fitBounds(cityLayer.getBounds()); // make the zoom level fit different browser size

  return map;
}


export {
  initializeMap,
};
