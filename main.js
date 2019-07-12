let results;
const searchBar = document.querySelector("#searchbar");
const applyFilter = document.querySelector("#filter");
const enterButton = document.querySelector("#doSearch");
const resultArea = document.querySelector("#resultArea");
const spinner = document.querySelector('#spinner');
const player = document.querySelector("#player");
const playerImg = document.querySelector("#playerImg");

spinner.style.display = 'none';


function createURL(search, filters){
    if (filters){    
        return "https://itunes-api-proxy.glitch.me/search?term=" + encodeURIComponent(search) + "&media=music&entity=song&attribute=" + encodeURIComponent(filters);
    }
    return "https://itunes-api-proxy.glitch.me/search?term=" + encodeURIComponent(search) + "&media=music&entity=song";
}

function changeColorBack(card){
    card.style.color = '#212529';
}

function populateResults (results) {
    resultArea.innerHTML = ''
    for (result of results){
        const resultCard = document.createElement("div");
        resultCard.innerHTML = `<div class="card border-warning" id=${result.previewUrl} style="width: 18rem;" aria-label="${result.trackName} by ${result.artistName}">
            <img src="${result.artworkUrl100}" class="card-img-top">
            <div class="card-body">
                <p class='card-text'><strong>${result.trackName}</strong></p>
                <p class="card-text">${result.artistName}</p>
                <p class="card-text">${result.collectionName}</p>
                <button class="btn btn-primary playbutton" value=${result.previewUrl} id=${result.artworkUrl100}>&#9658;</button>
            </div>
            </div>`
        resultArea.appendChild(resultCard);

    }
    const playButton = document.querySelectorAll(".playbutton");
    for (let button of playButton){
        button.addEventListener('click', function () {
            console.log(button.parentElement)
            console.log(button.parentNode)
            const trackCard = button.parentElement
            console.log(trackCard.style.color)
            trackCard.style.color = "deepskyblue";
            player.src = button.value;
            player.autoplay = true;
            playerImg.src = button.id;
            // window.setTimeout(changeColorBack(trackCard), 30000);
        })
    }
}


function doDaSearch () {
    const search = searchBar.value;
    const filter = applyFilter.value;
    spinner.style.display = 'block';
    fetch(createURL(search, filter))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let searchResults = data.results;
            console.log(searchResults);
            spinner.style.display = 'none';
            populateResults(searchResults);
        })
}


enterButton.addEventListener('click', doDaSearch)
window.addEventListener("keydown", function (event) {
    if (event.key === "Enter"){
        doDaSearch()
    }
})


