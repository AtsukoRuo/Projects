let searchBtnDOM = document.querySelector(".search-btn");
let searchInputDOM = document.querySelector(".search-input");
let searchResultWrapperDOM = document.querySelector(".search-result-wrapper");

async function submitSearch(e) {
    let url = `/BookedBook/Search?name=${searchInputDOM.value}`;
    let response = await fetch(url);
    if (!response.ok) {
        return;
    }
    let objects = await response.json();
    if (objects.length === 0) {
        sendMessageToTip("Not Found", "error");
        searchResultWrapperDOM.style.display = "none";
    } else {
        let len = searchResultWrapperDOM.childNodes.length;
        let childs = searchResultWrapperDOM.childNodes;
        for (let i = len - 1; i > 1; i--) {
            searchResultWrapperDOM.removeChild(childs[i]);
        }
        searchResultWrapperDOM.style.display = "block";
        let preHTML = '';
        for (const object of objects) {
            preHTML += `
            <div class="search-result-item">
                <span class="search-result-title">${object.secondPair}</span>
                <span class="search-result-checkedOut">${object.firstPair.time_out}</span>
                <span class="search-result-checkedIn">${object.firstPair.time_back}</span>
                <span class="search-result-Status">${object.firstPair.statues_back}</span>
                <span class="search-result-Note">${object.firstPair.info}</span>
            </div>`;
        }
        searchResultWrapperDOM.innerHTML += preHTML;
    }
}

searchBtnDOM.addEventListener('click', submitSearch);