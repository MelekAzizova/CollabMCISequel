const QueryString = window.location.search;
const UrlParams = new URLSearchParams(QueryString);
const linkShows = "https://api.tvmaze.com/shows";
const Place1 = document.getElementById("putter1");
const Place2 = document.getElementById("putter2");

function GetJson(link) {
    return fetch(link).then(res => res.json());
}

function isSpecefic(){
    return UrlParams.has("id")
}

async function OnPage(){
    if(isSpecefic()){
        RawJsData = await GetJson(linkShows + "/" + UrlParams.get("id"));

        Place1.innerHTML = `<h1 style="margin-bottom: 3rem;">${RawJsData.name}</h1>
        <p>${RawJsData.summary}</p>`;
        
        Place2.innerHTML = `<img src="${RawJsData.image.original}" alt="">`
    }
}

OnPage();