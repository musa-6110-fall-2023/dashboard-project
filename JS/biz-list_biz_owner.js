
const pointList = document.querySelector('.point-list');


function initializeList(bizpoints, events) {
    addPointsToList(bizpoints);

}



function addPointsToList(bizpoints) {
    let html = '';
    console.log(bizpoints);
    for (const point of bizpoints.features.slice(0, 10)) {
        const name = point.properties.Business;
        const phone = point.properties['Phone Number'];
        const address = point.properties['Address'];
        
        const pointListItemHTML = `
            <li>
                <div class="point-name">${name}</div>
                <div class="phone-number">${phone}</div>
                <div class="address">${address}</div>
            </li>
        `;
        html += pointListItemHTML;
    }
    pointList.innerHTML = html;

}

export {
    initializeList, addPointsToList,
}


