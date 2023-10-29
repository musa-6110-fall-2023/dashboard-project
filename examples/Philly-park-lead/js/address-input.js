const addressEntry = document.querySelector('#entry');
const addressChoiceList = document.querySelector(`#address-choices`);

function initializeAddressEntry() {
  addressEntry.addEventListener('input', handleAddressEntryChange);
}

async function handleAddressEntryChange() {
  const partialAddress = addressEntry.value; // .value gets the text of the entry
  const apiKey = 'pk.eyJ1IjoianVueWl5IiwiYSI6ImNsbm03NGszNDFrbHgybW1uZXBrMTMwZ3EifQ.VJyFnRhnQtJ9yU5gl0SdoA';
  const bbox = [-75.3002, 39.8544, -74.9995, 40.0649].join(',');
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${partialAddress}.json?bbox=${bbox}&access_token=${apiKey}`; // use ``

  const resp = await fetch(url); // use the url above to get a response
  const data = await resp.json(); // get data from reponse

  let html = '';
  for (const feature of data.features) { // .feature is just select json contents to have an array
    const lihtml = `
    <li data-lat="${feature.center[1]}" data-lon="${feature.center[0]}">
      ${feature.place_name}
    </li>
    `;
    html += lihtml;
  }
  addressChoiceList.innerHTML = html;

  const choices = addressChoiceList.querySelectorAll('li'); // select all the children of address choice list that match li
  for (const choice of choices) {
    choice.addEventListener(handleAddressChoice);
  }
  console.log(data);
}


function handleAddressChoice(evt) {

}

export {
  initializeAddressEntry,
};
