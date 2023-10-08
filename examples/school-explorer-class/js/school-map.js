function initializeMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    return map;
}
// wrap up initialization code in a function can make you determine when that code gets run
export {
    initializeMap,
}