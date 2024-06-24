const URL = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries"

const countries = document.querySelector('.countries');
const populationFilter = document.getElementById("population");
const loadingLoader = document.querySelector(".loading");


populationFilter.addEventListener('change', () =>{
    loadingLoader.style.display = 'flex'
    const populationValue = populationFilter.value;
    countries.innerHTML = ''
    fetchCountries(populationValue)

})

const displayContries = (data) =>{
    data.map((item) =>{
        countries.innerHTML += `
            <div class="country" key=${item.id}>
                <p>Rank: ${item.Rank}</p>
                <h2>${item.country}</h2>
                <p>Population: ${item.population}</p>
            </div>
        `
    })
} 

const fetchCountries = async (filter) => {
    loadingLoader.style.display = 'flex'
    try {
        const response = await fetch(filter ? `${URL}?sort=population&order=${filter}` : URL)
        const data = await response.json()
        displayContries(data.data)
        loadingLoader.style.display = 'none'
    } catch (error) {
        console.log(error)
        loadingLoader.style.display = 'none'
    }
}
fetchCountries()