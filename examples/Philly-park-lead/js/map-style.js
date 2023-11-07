const leadLabel = [
  'Less than 150',
  'From 150 to 400',
  'From 400 to 1,000',
  'From 1,000 to 2,000',
  'Greater than 2,000',
];

const parkLabel = [
  'Less than 33.74',
  'From 33.74 to 144.51',
  'From 144.51 to 304.48',
  'From 304.48 to 850.69',
  'Greater than 850.69',
];

const leadColor = [
  '#70855F',
  '#A2A67C',
  '#EDCA91',
  '#DB864D',
  '#C9643C',
];

const parkColor = [
  '#C3CA92',
  '#A4B17B',
  '#859864',
  '#697E50',
  '#4E6530',
];

const leadRadius = [
  2,
  3,
  5,
  7,
  10,
];

function calLeadStyle(sample) {
  if (sample.properties.Lead__ppm < 150) {
    return {
      stroke: true,
      color: '#f4f4f4',
      weight: 0.2,
      fillColor: '#70855F',
      fillOpacity: 0.9,
      radius: 2,
    };
  } else if (sample.properties.Lead__ppm >= 150 && sample.properties.Lead__ppm < 400) {
    return {
      stroke: true,
      color: '#f4f4f4',
      weight: 0.2,
      fillColor: '#A2A67C',
      fillOpacity: 0.9,
      radius: 3,
    };
  } else if (sample.properties.Lead__ppm >= 400 && sample.properties.Lead__ppm < 1000) {
    return {
      stroke: false,
      fillColor: '#EDCA91',
      fillOpacity: 0.9,
      radius: 5,
    };
  } else if (sample.properties.Lead__ppm >= 1000 && sample.properties.Lead__ppm < 2000) {
    return {
      stroke: false,
      fillColor: '#DB864D',
      fillOpacity: 0.9,
      radius: 7,
    };
  } else {
    return {
      stroke: false,
      fillColor: '#C9643C',
      fillOpacity: 0.9,
      radius: 10,
    };
  }
}

function calParkStyle(sample) {
  if (sample.properties.ACREAGE < 33.74) {
    return {
      stroke: false,
      fillColor: '#C3CA92',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.ACREAGE >= 33.74 && sample.properties.ACREAGE < 144.51) {
    return {
      stroke: false,
      fillColor: '#A4B17B',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.ACREAGE >= 144.51 && sample.properties.ACREAGE < 304.48) {
    return {
      stroke: false,
      fillColor: '#859864',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.ACREAGE >= 304.48 && sample.properties.ACREAGE < 850.69) {
    return {
      stroke: false,
      fillColor: '#697E50',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else {
    return {
      stroke: false,
      fillColor: '#4E6530',
      fillOpacity: 0.8,
      weight: 2,
    };
  }
}

// legend part

function legendStyle(map) {
  const legendDiv = document.createElement('div'); // abstract html div tag
  legendDiv.classList.add('legend'); // div class

  legendDiv.innerHTML = '<h2>Legend</h2>'; // add html content

  const legendContent = document.createElement('div'); // abstract html div tag
  legendContent.classList.add('legend-content'); // div class

  const soilDiv = document.createElement('div'); // abstract html div tag
  soilDiv.classList.add('soil-legend'); // div class
  soilDiv.innerHTML = '<h3>Soil Lead Level (ppm)</h3>'; // add html content
  let ulHTML = '<ul class="soil-entries">';
  const maxRadius = Math.max(...leadRadius); // ...flatten list
  for (const [index, label] of leadLabel.entries()) { // .entries gives both key and value
    const color = leadColor[index];
    const radius = leadRadius[index];
    const liHTML = `
      <li class="lead-entry">
        <span class="lead-color" style="background-color: ${color}; width: ${radius*2}px; height: ${radius*2}px; border-radius: ${radius}px; margin-left: ${maxRadius-radius}px; margin-right: ${maxRadius-radius}px"></span>
        <span class="lead-label">${label.replace(/ /g, '&nbsp;')}</span>
      </li>
      `;
    ulHTML += liHTML;
  }
  ulHTML += `</ul>`;
  soilDiv.innerHTML += ulHTML;

  const parkDiv = document.createElement('div'); // abstract html div tag
  parkDiv.classList.add('park-legend'); // div class
  parkDiv.innerHTML = '<h3>Park Size (acre)</h3>'; // add html content
  let pulHTML = '<ul class="park-entries">';
  for (const [index, label] of parkLabel.entries()) { // .entries gives both key and value
    const color = parkColor[index];
    const liHTML = `
      <li class="park-entry">
        <span class="park-color" style="background-color: ${color};"></span>
        <span class="park-label">${label.replace(/ /g, '&nbsp;')}</span>
      </li>
      `;
    pulHTML += liHTML;
  }
  pulHTML += `</ul>`;
  parkDiv.innerHTML += pulHTML;

  legendContent.appendChild(soilDiv); // [object HTMLDivElement], typically occurs when you're trying to insert an HTML element into the map using the innerHTML property of another element. When you concatenate soilDiv and legendDiv using the += operator, you are actually appending the [object HTMLDivElement] string representation of soilDiv to the legendDiv.
  legendContent.appendChild(parkDiv);

  legendDiv.appendChild(legendContent);

  return legendDiv; // return html div
}

// legend part END

// back button part
import { cityLayer } from './map.js'; // need to import cityLayer
import { setLeadLevel } from './chart.js';
function backButtonStyle(map) {
  const backDiv = document.createElement('div');
  backDiv.classList.add('back-button'); // div class
  backDiv.innerHTML = `<svg id="back" width="25px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#3d3d3d" stroke="#3d3d3d" stroke-width="33.792"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#474747" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#474747" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>`;
  // backDiv.innerHTML = `&lt;-`; // &lt; is <
  const leadLevelLabel = document.querySelector('#lead-level-chart .level-label');
  const leadText = document.getElementById('chart-text');
  backDiv.addEventListener('click', () => {
    map.fitBounds(cityLayer.getBounds());
    setLeadLevel(400);
    console.log(leadText);
    leadText.parentNode.removeChild(leadText);
  });
  return backDiv;
}

export {
  calLeadStyle,
  calParkStyle,
  legendStyle,
  backButtonStyle,
};
