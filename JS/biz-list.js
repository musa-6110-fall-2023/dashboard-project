const pointList = document.querySelector('.point-list');

function initializeList(bizpoints) {
    addPointsToList(bizpoints);
}


function addPointsToList(bizpoints) {
    let html = '';
    for (const point of bizpoints.features) {
        const name = point.properties.Business;
        const phone = point.properties['Phone Number'];
        const address = point.properties['Address']
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
    initializeList,
}