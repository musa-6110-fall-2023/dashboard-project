const addressFilter = document.querySelector('#address-filter');
const addressChoiceList = document.querySelector('#address-choices')
function initializeAddressFilter() {
    addressFilter.addEventListener('input', handleAddressFilterChange)
}


async function handleAddressFilterChange() {
    const partialAddress = addressFilter.value;
    const apikey = 'pk.eyJ1IjoibmVtb3p6eiIsImEiOiJjbDk1dHdxbnEwaDNzM29uOTgyNW9uMGpvIn0.8uF7fAAvGo1rVu-J8GeBew';
    const bbox = [-73.9941, 40.7302, -73.9837, 40.7414].join(',');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${partialAddress}.json?bbox=${bbox}&access_token=${apikey}`;
    
    const resp = await fetch(url);
    const data = await resp.json();

    let html = '';
    for (const feature of data.features) {
        const lihtml = `<li> ${feature.place_name} </li>`;
        html += lihtml;
    }

    addressChoiceList.innerHTML = html;
    console.log(data);
}

export{
    initializeAddressFilter,
}
