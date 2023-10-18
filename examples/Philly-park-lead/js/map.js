let phillyParkLayer = null;
let soilLayer = null;

function initializeMap(parks) {
  const map = L.map('map').setView([39.96, -75.15], 12);
  const baseTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/junyiy/clng7r3oq083901qx0eu9gaor/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbXMza292bjAxcXoybG1meHhuZ3N1cjYifQ.EYo5VECxk9-NCAEgc3dm9w');
  baseTileLayer.addTo(map);

  phillyParkLayer = L.geoJSON(parks);
  phillyParkLayer.addTo(map);


  return map;
}


export {
  initializeMap,
};
