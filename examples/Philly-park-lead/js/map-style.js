

function calLeadStyle(sample) {
  if (sample.properties.Lead__ppm < 150) {
    return {
      stroke: false,
      fillColor: '#CC4A56',
      fillOpacity: 0.9,
      weight: 2,
      radius: 10,
    };
  } else if (sample.properties.Lead__ppm >= 150 && sample.properties.Lead__ppm < 400) {
    return {
      stroke: false,
      fillColor: '#CC4A45',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.Lead__ppm >= 400 && sample.properties.Lead__ppm < 1000) {
    return {
      stroke: false,
      fillColor: '#CC4A45',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.Lead__ppm >= 1000 && sample.properties.Lead__ppm < 2000) {
    return {
      stroke: false,
      fillColor: '#CC4A45',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else {
    return {
      stroke: false,
      fillColor: '#CC4A45',
      fillOpacity: 0.9,
      weight: 2,
    };
  }
}


function changeLeadPointsStyle(points) { 
  for (const sample of points) {
    const marker = L.circleMarker(sample.geometry.coordinates, {
      radius: 3,
      style: calLeadStyle,
    });
    soilLayer.addLayer(marker);
  }
}

export {
    calLeadStyle,
};
