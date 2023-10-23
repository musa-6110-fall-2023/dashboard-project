

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
  if (sample.properties.ACREAGE < 32.20) {
    return {
      stroke: false,
      fillColor: '#C3CA92',
      fillOpacity: 0.9,
      weight: 2,
    };
  } else if (sample.properties.ACREAGE >= 32.20 && sample.properties.ACREAGE < 144.51) {
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

export {
  calLeadStyle,
  calParkStyle,
};
