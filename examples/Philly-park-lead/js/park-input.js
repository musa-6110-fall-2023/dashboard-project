const parkEntry = document.querySelector('#entry');
const parkChoiceList = document.querySelector(`#park-choices`);

// if checkbox is checked, see input
function initializeParkEntry(parks) {
  parkEntry.addEventListener('input', () => {
    handleSearchboxInput(parks);
  });
}

function handleSearchboxInput(parks) {
  const lowerCaseValue = parkEntry.value.toLowerCase();

  let html = '';
  for (const feature of parks.features) {
    if (feature.properties.SITE_NAME.toLowerCase().includes(lowerCaseValue)) {// make it case insensitive
      const lihtml = `
        <li class="park-choices">
          ${feature.properties.SITE_NAME}
        </li>
        `;
      html += lihtml;
    }
  }
  parkChoiceList.innerHTML = html;

  const choices = parkChoiceList.querySelectorAll('li'); // select all the children of address choice list that match li
  for (const choice of choices) {
    choice.addEventListener(handleParkChoice);
  }
}

function handleParkChoice() {

}

// function updateFilteredParks(parks, events) {
//   const lowerCaseValue = parkEntry.value.toLowerCase(); // .value is another attribute for input element. Other attributes like "checked" for checkbox
//   const filteredParks = []; // create a new thing to filter because don't want to overwrite
//   for (const park of parks.data.parks) {
//     if (park.name.toLowerCase().includes(lowerCaseValue)) {// make it case insensitive
//       filteredParks.push(park);
//     }
//   }

//   const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }}); // define your own event
//   events.dispatchEvent(newEvent);
// }

export {
  initializeParkEntry,
};
