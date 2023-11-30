let dataLayer = null;

function initializeBizMap(bizpoints) {
    const map = L.map('map').setView([40.737, -73.99], 15);
    const baseTileLayer =L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}@2x.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors', 
      }).addTo(map);
      
    dataLayer = L.geoJSON();
    dataLayer.addTo(map);
    map.dataLayer = dataLayer;
    
    addPointsToMap(bizpoints);
    
    return map;
  }

function addPointsToMap(bizpoints) {
  for (const point of bizpoints.features) {
    const [lon, lat] = point.geometry.coordinates;
    const name = point.properties.Business;
    const biztype = point.properties["Type of Business"];
    const address = point.properties.Address;
    const phone = point.properties["Phone Number"];
    //var icon_design = L.Icon({iconUrl: './purple.png', iconSize: [32,32]})
    const marker = L.circleMarker([lat, lon], {
      radius: 3,
      title:name,
      alt: name,
     // icon: iconDesign,
    });
    marker.bindTooltip(`<b>${name}</b><br><em>${biztype}<br>${address}<br>${phone}`);
    dataLayer.addLayer(marker);
  };
}



  export{
    initializeBizMap, addPointsToMap,
  }