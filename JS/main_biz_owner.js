import { initializeBizMap } from "./biz-map.js";
import { initializeList } from "./biz-list_biz_owner.js";
import { initFilters } from"./filter.js";
import { initializeSearch } from "./search.js";

const bizpointsResp = await fetch('data/union_sq.json');
const bizpoints = await bizpointsResp.json();
const map = initializeBizMap(bizpoints);

initializeList(bizpoints);
initFilters(bizpoints, map);
initializeSearch(bizpoints);

//dropdown
const dropdown = L.control({ position: 'topright' });

    dropdown.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'dropdown');
  
      div.innerHTML = '<button class="btn" id="filterButton">Filter</button>';
      div.querySelector('#filterButton').addEventListener('click', toggleDropdown);
      return div;
    };
  


function toggleDropdown() {
    const dropdownContent = document.getElementById("filterOptions");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }

  dropdown.addTo(map);

// popup submission form

function closeForm() {
      document.getElementById("popup-form").style.display = "none";
  }

// Add this function to handle form submission
function submitForm() {
  // Get form data
  const formData = {
      name: document.getElementById("nameInput").value,
      email: document.getElementById("emailInput").value,
      phoneNumber: document.getElementById("phone-number").value,
      message: document.getElementById("Message").value,
      // Add more fields as needed
  };

  // Store form data in localStorage
  localStorage.setItem("formData", JSON.stringify(formData));
  console.log("Form submitted!");
  // Close the form
  closeForm();
}

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the form submission button
  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", submitForm);
  } else {
    console.error("Submit button not found");
  }

  // Retrieve and display stored data when needed
  function displayStoredData() {
    console.log(localStorage.getItem("formData")); // Log the stored data

    const storedData = localStorage.getItem("formData");
    const displaySection = document.getElementById("storedDataSection");

    if (storedData && displaySection) {
      const parsedData = JSON.parse(storedData);

      // Create HTML elements to display the stored data
      const dataDisplay = document.createElement("div");
      dataDisplay.innerHTML = `<p>Name: ${parsedData.name}</p><p>Email: ${parsedData.email}</p>`;

      // Append the data display to the section
      displaySection.appendChild(dataDisplay);
    } else {
      console.error("Stored data or display section not found");
    }
  }

  // Call displayStoredData when needed, maybe on page load
  displayStoredData();
});