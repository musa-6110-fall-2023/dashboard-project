const schoolList = document.querySelector('.school-list'); // get the school list element in html

function initializeList(schools) {
  addSchoolsToList(schools);
  return schoolList;
}

function addSchoolsToList(schools) {
  let html = '';
  for (const school of schools) {
    const name = school.name;
    const type = school['Admission Type'];

    const schoolListItemHTML = ` 
    <li>
      <div class="school-name">${name}</div>
      <div class="school-type">${type}</div>
    </li>
    `; // when put html inside js, you need to use `` because this can include new lines in the string itself
    html += schoolListItemHTML; // shortcut of saying html = html + schoolListItemHTML
  }
  schoolList.innerHTML = html;
}

export {
  initializeList,
};
