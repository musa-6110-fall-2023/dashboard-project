const parkEntry = document.querySelector('#entry');
const parkChoiceList = document.querySelector(`#park-choices`);

// if checkbox is checked, see input
function initializeParkEntry(parks, events) {
  if (parkEntry.mycustomfunc) {
    parkEntry.removeEventListener('input', parkEntry.mycustomfunc);
  }
  parkEntry.mycustomfunc = () => {
    handleSearchboxInput(parks, events);
  };
  parkEntry.addEventListener('input', parkEntry.mycustomfunc);
}

function handleSearchboxInput(parks, events) {
  console.log('handling park inputs');
  const lowerCaseValue = parkEntry.value.toLowerCase();

  let html = '';
  for (const feature of parks.features) {
    if (lowerCaseValue != ``) {
      if (feature.properties.ASSET_NAME.toLowerCase().includes(lowerCaseValue) || feature.properties.SITE_NAME.toLowerCase().includes(lowerCaseValue)) {// make it case insensitive
        const lihtml = `
        <li class="park-choices" data-parkid="${feature.id}"> 
          ${feature.properties.ASSET_NAME} - ${feature.properties.SITE_NAME}
        </li>
        `; // remember to add customized data attribute to have reference of the park ID for later use
        html += lihtml;
      }
    }
  }
  parkChoiceList.innerHTML = html;

  const choices = parkChoiceList.querySelectorAll('li'); // select all the children of address choice list that match li
  for (const choice of choices) {
    choice.addEventListener('click', (evt) => {
      handleParkChoice(evt, events);
    });
  }
}

function handleParkChoice(evt, events) {
  const li = evt.target; // .target is just get the object you click
  console.log(li);
  const mapZoomSelect = li.dataset.parkid; // .dataset is get the attribute in html (get your customized attribute!)

  // define a customized event
  const zoomId = new CustomEvent('zoom-map', { detail: { mapZoomSelect }}); // define your own event
  events.dispatchEvent(zoomId);
}

export {
  initializeParkEntry,
};
