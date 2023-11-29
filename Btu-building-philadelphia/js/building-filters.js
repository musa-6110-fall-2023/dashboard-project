// const typeCheckboxes = document.querySelectorAll('[name="school-filter-type"]');



function initializeType (buildings, events) {
    const typeCheckboxes = document.querySelectorAll('[name="school-filter-type"]');
    typeCheckboxes.addEventListener('input', (evt) => {
        handleCehckboxInput(evt, buildings, events);
    });
}

function handleCehckboxInput(evt, buildings, events) {
    filterType(buildings, events);
}

function filterType (buildings, events) {
    const typeCheckboxes = document.querySelectorAll('[name="school-filter-type"]');
    console.log(typeCheckboxes);

    const filteredType = [];
    for (let i =0; i<buildings.features.length; i++) {

    }
}




export {
    initializeType

};