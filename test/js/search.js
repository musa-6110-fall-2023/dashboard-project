function initializeSearch(placeInfo, events) {
    const searchBox = document.querySelector('#place-name-filter');
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.id = 'search-button';

    searchButton.addEventListener('click', () => {
        const showAccessibleOnly = document.getElementById('accessible-checkbox').checked;
        const filteredPlaces = updateFilteredPlaces(placeInfo, events, showAccessibleOnly);
        const newEvent = new CustomEvent('filter-places', { detail: { filteredPlaces } });
        events.dispatchEvent(newEvent);
    });

    searchBox.insertAdjacentElement('afterend', searchButton);
}

function updateFilteredPlaces(placeInfo, events, showAccessibleOnly) {
    const searchBox = document.querySelector('#place-name-filter');
    const lowercaseValue = searchBox.value.toLowerCase();

    console.log('Search Term:', lowercaseValue);
    console.log('placeInfo:', placeInfo);

    const filteredPlaces = [];

    if (placeInfo.features) {
        for (const place of placeInfo.features) {
            const properties = place.properties;

            if (showAccessibleOnly && properties.accessibility_code !== 'A') {
                continue; 
            }

            if (properties && properties.placename && properties.placename.toLowerCase().includes(lowercaseValue)) {
                filteredPlaces.push(place);
            }
        }
    }

    const newEvent = new CustomEvent('filter-places', { detail: { filteredPlaces } });
    events.dispatchEvent(newEvent);

    return filteredPlaces;
}

function updateSearchResults(filteredPlaces) {
    const searchResultsContainer = document.getElementById('search-results-container');

    searchResultsContainer.innerHTML = '';

    if (filteredPlaces.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const uniquePlaces = new Map();

    filteredPlaces.forEach(place => {
        const placeName = place.properties.placename;

        if (!uniquePlaces.has(placeName)) {
            uniquePlaces.set(placeName, place);
        }
    });

    const resultList = document.createElement('ul');
    const uniquePlacesArray = Array.from(uniquePlaces.values());

    uniquePlacesArray.forEach(place => {
        const listItem = document.createElement('li');
        listItem.textContent = place.properties.placename;
        resultList.appendChild(listItem);
    });

    searchResultsContainer.appendChild(resultList);
}

const accessibleCheckbox = document.getElementById('accessible-checkbox');
accessibleCheckbox.addEventListener('change', function () {
    const showAccessibleOnly = this.checked;
    updateFilteredPlaces(placeInfo, events, showAccessibleOnly);
});

export {
    initializeSearch,
    updateFilteredPlaces,
    updateSearchResults,
};
