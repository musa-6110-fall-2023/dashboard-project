const parkList = document.querySelector('.park-list');

function initializeList(parks) {
  addParksToList(parks);
  return parkList;
}

function addParksToList(parks) {
  let html = '';
  for (const park of parks.features) {
    const name = park.properties.SITE_NAME;
    const parent = park.properties.CHILD_OF;
    const use = park.properties.USE_;

    const parkListItemHTML = ` 
    <li>
      <div class="park-name">${name}</div>
      <div class="park-parent">${parent}</div>
      <div class="park-use">${use}</div>
    </li>
    `; // when put html inside js, you need to use `` because this can include new lines in the string itself
    html += parkListItemHTML; // shortcut of saying html = html + schoolListItemHTML
  }
  parkList.innerHTML = html;
}

export {
  initializeList,
};
