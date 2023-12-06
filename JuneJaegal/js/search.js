function initializeSearch(pollingInfo, events) {
    const searchBox = document.querySelector('#place-name-filter');
    searchBox.addEventListener('input', (evt) => {
      handleSearchBoxInput(evt, pollingInfo, events);
    });
  }
  
  function handleSearchBoxInput(evt, pollingInfo, events) {
    updateFilteredStations(pollingInfo, events);
  }
  
  function updateFilteredStations(pollingInfo, events) {
    const searchBox = document.querySelector('#place-name-filter');
    const lowercaseValue = searchBox.value.toLowerCase();
  
    const filteredStations = [];
    for (const station of pollingInfo.data.stations) {
      if (station.name.toLowerCase().includes(lowercaseValue)) {
        filteredStations.push(station);
      }
    }
  
    // const filteredStations = pollingInfo.data.stations
    //     .filter((station) => station.name.toLowerCase().includes(lowercaseValue));
  
    const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }});
    events.dispatchEvent(newEvent);
  }
  
  export {
    initializeSearch,
  };