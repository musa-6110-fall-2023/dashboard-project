function initializeSearch() {
    const searchbox = document.querySelector('#biz-filter'); 

    searchbox = addEventListener('input', handleSearchboxinput);
}
    function handleSearchboxinput(evt) {
        console.log(evt)
    }

export{
    initializeSearch,
}