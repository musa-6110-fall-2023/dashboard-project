function leadAnalysis(parkBuffer, leadSamples) {
  let featureSelectionBoolean = [];
  leadSamples.eachLayer((layer) => {
    const pointsWithin = turf.booleanWithin(layer.feature, parkBuffer);
    featureSelectionBoolean = featureSelectionBoolean.push(pointsWithin);
  });
  const featureSelection = leadSamples.feature.filter(featureSelectionBoolean);
  if (featureSelection.length == 0) {

  } else {
    
  }
}

export {
  leadAnalysis,
};
