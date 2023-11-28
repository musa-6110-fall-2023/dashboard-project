const icons = {
  'Premier League': 'images/PremierLeague.png',
  'Championship': 'images/Championship.png',
  'League One': 'images/League1.png',
  'League Two': 'images/League2.png',
  'Manchester United': 'images/manunited.png'
};

function initializeMap(stadiumInfo, events) {
  const map = L.map('map').setView([52.980822,-1.929994], 7);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v12',
    accessToken: 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA',
  }).addTo(map);

  const stadiumsLayer = L.layerGroup();
  stadiumsLayer.addTo(map);

  updateMapStadiums(stadiumInfo.features, stadiumsLayer); // Use features from GeoJSON

  events.addEventListener('filter-stadiums', (evt) => {
    const filteredStadiums = evt.detail.filteredStadiums;
    updateMapStadiums(filteredStadiums, stadiumsLayer);
  });

  return map;
}

const stadiumIcon = L.icon({
  iconUrl: 'images/stadium_icon.png',
  iconSize: [22, 31.5], // size of the icon
  iconAnchor: [11, 31.5], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35],
});

function updateMapStadiums(stadiumsGeoJSON, stadiumsLayer) {
  stadiumsLayer.clearLayers();

  stadiumsGeoJSON.forEach((feature) => {
    const stadium = feature.properties;
    const coordinates = feature.geometry.coordinates;

    let iconUrl;
    let iconSize;
    let iconAnchor;
    
    if (stadium.Team === 'Manchester United') {
      // Special icon for Manchester United
      iconUrl = 'images/manunited.png';
      iconSize = [45, 45]; // 2x size for Manchester United
      iconAnchor = [22.5, 45]; // Adjust iconAnchor accordingly
    } else {
      // Use the league icon for other teams
      iconUrl = icons[stadium.Division] || 'images/default_icon.png';
      iconSize = [30, 30]; // Default size for other teams
      iconAnchor = [15, 30]; // Default anchor for other teams
    }

    const customIcon = L.icon({
      iconUrl: iconUrl,
      iconSize: iconSize,
      iconAnchor: iconAnchor,
      popupAnchor: [0, -30]
    });

    const marker = L.marker([coordinates[1], coordinates[0]], {
      alt: stadium.Team,
      icon: customIcon,
    });

    marker.bindTooltip(stadium.Team);
    marker.bindPopup(`
      <h2 class="stadium-name">${stadium.Team}</h2>
      <p class="stadium-address">${stadium.Division}</p>
      <p class="stadium-address">${stadium.Stadium}</p>
      <p class="stadium-address">${stadium.Year_Open}</p>
      <p class="stadium-address">${stadium.Capacity}</p>
    `);
    marker.addTo(stadiumsLayer);
  });
}



export {
  initializeMap,
};
