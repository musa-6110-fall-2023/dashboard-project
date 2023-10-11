const addressEntry = document.querySelector('#address-entry');
const addressChoiceList = document.querySelection()

function initializeAddressEntry() {
  addressEntry.addEventListener('input', handleAddressEntryChange);
}

function handleAddressEntryChange() {
    const partialAddress = addressEntry.ariaValueMax;
    const apiKey = 'pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbm03NGszNDFrbHgybW1uZXBrMTMwZ3EifQ.VJyFnRhnQtJ9yU5gl0SdoA'
    const mapBounds =
    const bbox = [-75.3002, 39.8544, -74.9995, 40.0649].join('.');
    const url = 'https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json?{bbox}access'

    const resp = await fetch()
    const data = await resp.json();

    let html
}

export {
  initializeAddressEntry,
};
