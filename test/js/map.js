// map.js
function initializeMap(placeData, events) {
    const map = L.map('map').setView([40., -75.16], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/streets-v12',
        accessToken: 'pk.eyJ1IjoiamphZWdhbCIsImEiOiJjbG82M2syM2QwMHV3MndtbmVybjVlODRrIn0.FsykpslPUNJu0_MWiWKM6A'
    }).addTo(map);

    var placeLayer = L.layerGroup();
    var showAccessibleOnly = false; // Add this line to set a default value

    function handleFilterPlaces(evt) {
        const filteredPlaces = evt.detail.filteredPlaces;
        updateMapPlaces(filteredPlaces, placeLayer, showAccessibleOnly);
    }

    events.addEventListener('filter-places', handleFilterPlaces);

    function updateMapPlaces(places, placeLayer, showAccessibleOnly) {
        placeLayer.clearLayers();
        console.log(`Adding ${places.length} places to the map.`);

        places.forEach(place => {
            const coordinates = place.geometry.coordinates;
            const placename = place.properties.placename;
            const accessibilityCode = place.properties.accessibility_code;

            // Check if the place is accessible before adding to the layer
            if (accessibilityCode === 'A' || !showAccessibleOnly) {
                const marker = L.marker([coordinates[1], coordinates[0]]);
                marker.addTo(placeLayer).bindTooltip(placename);
            }
        });
    }

    placeData.features.forEach(function (place) {
        const coordinates = place.geometry.coordinates;
        const placename = place.properties.placename;
        const accessibilityCode = place.properties.accessibility_code;

        // Check if the place is accessible before adding to the layer
        if (accessibilityCode === 'A' || !showAccessibleOnly) {
            const marker = L.marker([coordinates[1], coordinates[0]]);
            marker.addTo(placeLayer).bindTooltip(placename);
        }
    });

    placeLayer.addTo(map);

    return map;
}

export {
    initializeMap,
};
