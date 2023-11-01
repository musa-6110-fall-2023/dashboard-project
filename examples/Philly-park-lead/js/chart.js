const leadLevelMarker = document.querySelector('#lead-level-chart .level');
const leadLevelLabel = document.querySelector('#lead-level-chart .level-label');

function setLeadLevel(n) {
  const maxLeadLevel = 18064;
  // const scaledValue = n / maxLeadLevel * 100;
  // if use log scale
  const scaledValue = Math.log(n) / Math.log(maxLeadLevel) * 100;

  // Set the location of the marker
  leadLevelMarker.style.width = `${scaledValue}%`;

  // Set the text of the label
  leadLevelLabel.innerHTML = `${n} ppm`;

  // Set the location of the label
  const labelW = leadLevelLabel.offsetWidth;
  leadLevelLabel.style.left = `min(calc(100% - ${labelW + 1}px), ${scaledValue}%)`;
}

export {
  setLeadLevel,
};

