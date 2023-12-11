function initializeFilters(eats, eventBus) {

  const nhoodCheckboxes = document.querySelectorAll('[name="eats-filter-nhood"]');
  const CuisineCheckboxes = document.querySelectorAll('[name="eats-filter-cuisine"]');
  const happyHourCheckboxes = document.querySelectorAll('[name="eats-filter-hh"]');


  window.eatsCuisineFilters = CuisineCheckboxes;
  window.nhoodFilters = nhoodCheckboxes;
  window.happyHourFilters = happyHourCheckboxes;


  //Making unique URLs

  const hash = window.location.hash
  console.log(hash)

  if (hash) {
    // Step 1: Remove the hash by using the "substring function"
    const newHash = hash.substring(1).replace(/%20/g, ' ');
    console.log(newHash)

    //Step 2: Split the string into 2 separate strings using "split function" at the "&", leaving me with 2 separate strings
    const [cuisineHash, nhoodHash, hhHash] = newHash.split("&");
    console.log(cuisineHash)
    console.log(nhoodHash)
    console.log(hhHash)

    // Step 3: Remove "cuisine=" from the string and split the rest of that string by ","
    const newCuisineHash = cuisineHash.slice(8) 
    console.log(newCuisineHash)

    // Step 4: Do the same for neighborhoods string
    const newNhoodHash = nhoodHash.slice(13)
    console.log(newNhoodHash)

    // Step 5: Do this for hh Hash
    const newhhHash = hhHash.slice(10)
    console.log(newhhHash)

    // Step 5: This will leave us with an array of cuisines & an array of nhoods
    const newestCuisineHash = newCuisineHash.split(",");
    const newestNhoodHash = newNhoodHash.split(",");
    const newesthhHash = newhhHash.split(",");
    console.log(newestCuisineHash);
    console.log(newestNhoodHash);
    console.log(newesthhHash);

    // Step 6: Using the array of cuisines, loop over the array to look for the cuisine checkbox that matches that value, then cb.checked=true

    for (const cb of nhoodCheckboxes) {
      if (newestNhoodHash.includes(cb.value)) {
        cb.checked = true;
      }
    }

    // Step 7: Repeat for cuisines

    for (const cb of CuisineCheckboxes) {
      if (newestCuisineHash.includes(cb.value)) {
        cb.checked = true;
      }
    }

    // Step 8: Repeat for HH 

    for (const cb of happyHourCheckboxes) {
      if (newesthhHash.includes(cb.value)) {
        cb.checked = true;
      }
    }
  }

  // // Step 8: Finally, filter the data using a pre-existing function
  filterRestaurants();

  // Create Neighborhood Checkbox Filter

  for (const nhoodID of nhoodCheckboxes) {
    nhoodID.addEventListener(
      "change", () => {
        filterRestaurants();
      }
    )
  }

  // Create Cuisine Checkbox Filter 

  for (const cuisineID of CuisineCheckboxes) {
    cuisineID.addEventListener(
      "change", () => {
        filterCuisine();
      }
    )
  }

  // Create HH Checkbox Filter 

  for (const hhID of happyHourCheckboxes) {
    hhID.addEventListener(
      "change", () => {
        filterhh();
      }
    )
  }

  // Setup Filters to Understand Nhood & Cuisine & HH

  function shouldShowRestaurant(restaurant) {
    let inSelectedNhood = false;
    let inSelectedCuisine = false;
    let inSelectedHH = false;

    // Neighborhoods
    const checkedNhoodCBs = [];
    for (const cb of nhoodCheckboxes) {
      if (cb.checked) {
        checkedNhoodCBs.push(cb);
      }
    }

    if (checkedNhoodCBs.length > 0) {
      for (const cb of checkedNhoodCBs) {
        if (restaurant.properties.Neighborhood == cb.value) {
          inSelectedNhood = true;
          break;

        }
      }
    } else {
      inSelectedNhood = true;
    }

    // Cuisine 

    const checkedCuisineCBs = [];
    for (const cb of CuisineCheckboxes) {
      if (cb.checked) {
        checkedCuisineCBs.push(cb);
      }
    }

    if (checkedCuisineCBs.length > 0) {
      for (const cb of checkedCuisineCBs) {
        if (restaurant.properties.Cuisine == cb.value) {
          inSelectedCuisine = true;

        }
      }
    } else {
      inSelectedCuisine = true;
    }

    // Happy Hour 

    const happyHourCBs = [];
    for (const cb of happyHourCheckboxes) {
      if (cb.checked) {
        happyHourCBs.push(cb);
      }
    }

    if (happyHourCBs.length > 0) {
      for (const cb of happyHourCBs) {
        if (restaurant.properties.HappyHour == cb.value) {
          inSelectedHH = true;

        }
      }
    } else {
      inSelectedHH = true;
    }

    return inSelectedNhood && inSelectedCuisine && inSelectedHH
  }

  // Setup Individual Filters for Nhood & Cuisine 

  //Nhood Checkbox Filter

  function filterRestaurants() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowRestaurant(eatsPlace)) {
        filteredData.push(eatsPlace);
      }

    }
    const newEvent3 = new CustomEvent("filtered",
      {
        detail: filteredData
      })
    eventBus.dispatchEvent(newEvent3)
    makeNewURL();
  }

  // Update URL 

  function makeNewURL() {

    const nhoodsURL = [];
    for (const cb of nhoodCheckboxes) {
      if (cb.checked) {
        nhoodsURL.push(cb.value);
      }
    }

    const CuisinesURL = [];
    for (const cb of CuisineCheckboxes) {
      if (cb.checked) {
        CuisinesURL.push(cb.value);
      }
    }

    const hhURL = [];
    for (const cb of happyHourCheckboxes) {
      if (cb.checked) {
        hhURL.push(cb.value);
      }
    }

    const nhood_param = (nhoodsURL.join(','));
    const cuisine_param = (CuisinesURL.join(','));
    const hh_param = (hhURL.join(','));

    const hash = `Cuisine=${cuisine_param}&Neighborhood=${nhood_param}&HappyHour=${hh_param}`;
    window.location.hash = hash;

  }

  // Cuisine Checkbox Filter

  function filterCuisine() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowRestaurant(eatsPlace)) {
        filteredData.push(eatsPlace);

      }
      const newEvent4 = new CustomEvent("filtered",
        {
          detail: filteredData
        })
      eventBus.dispatchEvent(newEvent4)
      makeNewURL();
    }
  }

  // HH Checkbox Filter 

  function filterhh() {
    const filteredData = []
    for (const eatsPlace of eats.features) {
      if (shouldShowRestaurant(eatsPlace)) {
        filteredData.push(eatsPlace);

      }
      const newEvent5 = new CustomEvent("filtered",
        {
          detail: filteredData
        })
      eventBus.dispatchEvent(newEvent5)
      makeNewURL();
    }
  }

}

export {
  initializeFilters
}