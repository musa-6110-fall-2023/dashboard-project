function initializeMap() {
  const map = L.map('map').setView([39.96, -75.15], 13);
  const baseTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/junyiy/clnm30x5u004101p71nocglgj/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbXMza292bjAxcXoybG1meHhuZ3N1cjYifQ.EYo5VECxk9-NCAEgc3dm9w');
  baseTileLayer.addTo(map);
  return map;
}
// wrap up initialization code in a function can make you determine when that code gets run
export {
  initializeMap,
}