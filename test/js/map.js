function initializeMap(placeData, events, markerIcon) {
    const map = L.map('map').setView([40.0, -75.16], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/streets-v12',
        accessToken: 'pk.eyJ1IjoiamphZWdhbCIsImEiOiJjbG82M2syM2QwMHV3MndtbmVybjVlODRrIn0.FsykpslPUNJu0_MWiWKM6A'
    }).addTo(map);

    var placeLayer = L.layerGroup();
    var showAccessibleOnly = false;

    function handleFilterPlaces(evt) {
        const filteredPlaces = evt.detail.filteredPlaces;
        updateMapPlaces(filteredPlaces, placeLayer, showAccessibleOnly, markerIcon);
    }

    events.addEventListener('filter-places', handleFilterPlaces);

    function updateMapPlaces(places, placeLayer, showAccessibleOnly, markerIcon) {
        placeLayer.clearLayers();
        console.log(`Adding ${places.length} places to the map.`);

        places.forEach(place => {
            const coordinates = place.geometry.coordinates;
            const placename = place.properties.placename;
            const accessibilityCode = place.properties.accessibility_code;

            if (accessibilityCode === 'A' || !showAccessibleOnly) {
                const marker = L.marker([coordinates[1], coordinates[0]], { icon: markerIcon });

                marker.bindPopup(createReviewForm(placename, events)).on('popupopen', function () {
                    console.log('Popup opened');
                }).on('popupclose', function () {
                    console.log('Popup closed');
                });

                marker.addTo(placeLayer).bindTooltip(placename);
            }
        });
    }

    placeData.features.forEach(function (place) {
        const coordinates = place.geometry.coordinates;
        const placename = place.properties.placename;
        const accessibilityCode = place.properties.accessibility_code;

        if (accessibilityCode === 'A' || !showAccessibleOnly) {
            const marker = L.marker([coordinates[1], coordinates[0]], { icon: markerIcon });

            marker.bindPopup(createReviewForm(placename, events)).on('popupopen', function () {
                console.log('Popup opened');
            }).on('popupclose', function () {
                console.log('Popup closed');
            });

            marker.addTo(placeLayer).bindTooltip(placename);
        }
    });

    placeLayer.addTo(map);

    return map;
}

function createReviewForm(placeName, events) {
    const formContainer = document.createElement('div');
    
    const reviewForm = document.createElement('form');
    const reviewInput = document.createElement('textarea');
    reviewInput.placeholder = 'Write your review here...';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Review';

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const reviewText = reviewInput.value;
        const reviewEvent = new CustomEvent('submit-review', { detail: { placeName, reviewText } });
        events.dispatchEvent(reviewEvent);
        const source = event.currentTarget._source;
        if (source) {
            const popup = source._popup;
            if (popup) {
                console.log('Closing the popup');
                popup.remove();
            }
        }
    });

    reviewForm.appendChild(reviewInput);
    reviewForm.appendChild(submitButton);

    formContainer.appendChild(reviewForm);

    return formContainer;
}

export {
    initializeMap,
};
