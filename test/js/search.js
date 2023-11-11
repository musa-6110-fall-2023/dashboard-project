// search.js
function initializeSearch(placeInfo, events) {
    const searchBox = document.querySelector('#place-name-filter');
    searchBox.addEventListener('input', (evt) => {
        const showAccessibleOnly = document.getElementById('accessible-checkbox').checked;
        const filteredPlaces = updateFilteredPlaces(placeInfo, events, showAccessibleOnly);
        const newEvent = new CustomEvent('filter-places', { detail: { filteredPlaces } });
        events.dispatchEvent(newEvent);
    });
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

            // Accessibility filter
            if (showAccessibleOnly && properties.accessibility_code !== 'A') {
                continue; // Skip if not accessible
            }

            // Place name filter
            if (properties && properties.placename && properties.placename.toLowerCase().includes(lowercaseValue)) {
                filteredPlaces.push(place);
            }
        }
    }

    const newEvent = new CustomEvent('filter-places', { detail: { filteredPlaces } });
    events.dispatchEvent(newEvent);

    // Move this line to update search results immediately after filtering
    updateSearchResults(filteredPlaces);

    return filteredPlaces;
}


function updateSearchResults(filteredPlaces) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (filteredPlaces.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const resultList = document.createElement('ul');
    filteredPlaces.forEach(place => {
        const listItem = document.createElement('li');
        listItem.textContent = place.properties.placename;
        resultList.appendChild(listItem);
    });

    searchResultsContainer.appendChild(resultList);
}

// Event listener for checkbox change
const accessibleCheckbox = document.getElementById('accessible-checkbox');
accessibleCheckbox.addEventListener('change', function () {
    const showAccessibleOnly = this.checked;
    updateFilteredPlaces(placeInfo, events, showAccessibleOnly);
});

export {
    initializeSearch,
};
