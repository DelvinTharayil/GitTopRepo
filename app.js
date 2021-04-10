const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const showApiData = document.getElementById("apiData");


getTrendingListOfRepositories()

async function getTrendingListOfRepositories() {

    var date = new Date();
    date.setDate(date.getDate() - 7);
    let dateString = date.toLocaleDateString('en-CA')

    fetch("https://api.github.com/search/repositories?q=created:%3E" + dateString + "&sort=stars&order=desc")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            const apiTrendingData = data.items
            
            showApiData.innerHTML = apiTrendingData.map(datashow).join("") 

        })
        .catch((err) => {
        })

}

async function searchRepository(userQuery) {

    fetch("https://api.github.com/search/repositories?q=" + userQuery + ":%3E1&sort=stars")
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            console.log(data)
            const apiData = data.items
            
  
        showApiData.innerHTML = apiData.map(datashow).join("") 



        })
        .catch((err) => {

        })

}

function datashow(repo) {
    return `  
<div class="profile-card">
    <div class="img-area">
        <div class="inner-area">
            <img src="${repo.owner.avatar_url}" alt="" />
        </div>
    </div>

    <div class="Repo">${repo.name}</div>
    <div class="Owner"><b>Owner:</b>${repo.owner.login}</div>

    <div class="buttons">
        <button><a href="${repo.clone_url}">Repository</a></button>
        <button><a href="${repo.owner.html_url}">Profile</a></button>
    </div>

    <div class="social-share">
        <div class="row">
            <i class="far fa-eye"></i>
            <i class="icon-2 fas fa-eye"></i>
            <span>${repo.watchers}</span>
        </div>

        <div class="row">
            <i class="far fa-star"></i>
            <i class="icon-2 fas fa-star"></i>
            <span>${(repo.stargazers_count)}</span>
        </div>

        <div class="row">
            <i class="fas fa-code-branch"></i>
            <span>${(repo.forks)}</span>
        </div>
    </div>
</div>
    `

    }

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userQuery = search.value;
    if (userQuery) {
        searchRepository(userQuery);
        search.value = "";
    }
});