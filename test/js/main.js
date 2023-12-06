import { initializeMap } from "./map.js";
import { initializeSearch, updateSearchResults } from "./search.js";

const placeInfoResp = await fetch('data/polling_places.geojson');
const placeInfo = await placeInfoResp.json();

const events = new EventTarget();

const markerIcon = L.icon({
    iconUrl: 'data/pollsymbol.png',
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

initializeMap(placeInfo, events, markerIcon);

initializeSearch(placeInfo, events);

const reviewContainer = document.getElementById('review-container');
const reviewHeading = document.createElement('h2');
reviewHeading.textContent = 'Reviews';
reviewContainer.appendChild(reviewHeading);
events.addEventListener('submit-review', function (event) {
    const { placeName, reviewText } = event.detail;

    updateReviewResults(placeName, reviewText);
});


function updateReviewResults(placeName, reviewText) {
    const newReview = document.createElement('p');
    newReview.textContent = `${placeName}: ${reviewText}`;
    reviewContainer.appendChild(newReview);
}

events.addEventListener('filter-places', function (event) {
    const filteredPlaces = event.detail.filteredPlaces;
    updateSearchResults(filteredPlaces);
});
