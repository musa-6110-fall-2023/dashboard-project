document.getElementById('biz-search-button').addEventListener('click', initializeSearch);

function initializeSearch() {
    const input = document.getElementById('biz-search-input').value.toLowerCase();

for (const point of filteredBusinesses) {
    const filteredFeatures = point.features.filter(feature => {
        const businessName = feature.properties["Business"].toLowerCase();
        return businessName.includes(input);
    });
}

}



export{
    initializeSearch,
}