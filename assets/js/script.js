const Place1 = document.getElementById("putter1");
const linkShows = "https://api.tvmaze.com/shows?page=";
const linkSearch = "https://api.tvmaze.com/search/shows?q=";
const QueryString = window.location.search;
const UrlParams = new URLSearchParams(QueryString);
const formF1 = document.getElementById('filter1');


formF1.addEventListener('submit', function (event) {
    event.preventDefault();
    let params = "?";
    params += "showType=" + formF1.showType.options[formF1.showType.selectedIndex].value;
    params += "&language=" + formF1.language.options[formF1.language.selectedIndex].value;
    params += "&genre=" + formF1.genre.options[formF1.genre.selectedIndex].value;
    params += "&rating=" + formF1.rating.options[formF1.rating.selectedIndex].value;
    location.href = location.pathname + params;
});

function GetJson(link) {
    return fetch(link).then(res => res.json());
}

function isSearch() {
    if (!UrlParams.has("search")) return false;
    return true;
}

function isShows() {
    if (!UrlParams.has("showType")) return false;
    if (!UrlParams.has("language")) return false;
    if (!UrlParams.has("genre")) return false;
    if (!UrlParams.has("rating")) return false;
    return true;
}
function ifShows(element) {
    let check = "" + element.type;
    if (check != UrlParams.get("showType")) return false;

    check = "" + element.language;
    if (check != UrlParams.get("language")) return false;

    if (element.rating.average != null) {
        check = "" + element.rating.average;
        if (check > UrlParams.get("rating")) return false;
    }

    if (!element.genres.includes(UrlParams.get("genre"))) return false;
    return true;
}

function SToPut(RawJsData) {
    let result = "";

    return result;
}

async function OnPage() {

    let flag = 0;
    if (isSearch()) flag = 1;
    else if (isShows()) flag = 2;

    if (flag > 0) {
        let ToPut = "";
        let k = 0;
        let RawJsData;

        if (flag == 2) {
            do {
                RawJsData = await GetJson(linkShows + k++);
                for (let i = 0; i < RawJsData.length; i++) {
                    let element = RawJsData[i];

                    if (element.image != null && ifShows(element)) {
                        console.log("g2");
                        ToPut +=
                            `<li>
                    <a href="specific.html?id=${element.id}">
                      <div class="film__img">
                        <img src="${element.image.medium}" alt="" />
                        <p>${element.name}</p>
                      </div>
                    </a>
                    </li>`
                    }
                }
            } while (RawJsData.length > 0);
        }
        else if (flag == 1) {
            RawJsData = await GetJson(linkSearch + UrlParams.get("search"));
            console.log(UrlParams.get("search"));

            for (let i = 0; i < RawJsData.length; i++) {
                let element = RawJsData[i].show;

                if (element.image != null) {
                    console.log("g1");
                    ToPut +=
                        `<li>
                <a href="specific.html?id=${element.id}">
                  <div class="film__img">
                    <img src="${element.image.medium}" alt="" />
                    <p>${element.name}</p>
                  </div>
                </a>
                </li>`
                }
            }
        }

        Place1.innerHTML = ToPut;
    }
}


OnPage();
