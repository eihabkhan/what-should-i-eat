const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";
const searchInput = document.getElementById("search");
const submit = document.getElementById("submit");
const randomBtn = document.getElementById("random")
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMealEl = document.getElementById("single-meal")


// Functions
function searchMeal(e) {
    e.preventDefault();

    singleMealEl.innerHTML = "";

    const term = searchInput.value
    
    if (term.trim()) {
        fetch(`${API_URL}?s=${term}`)
            .then(res => res.json())
                .then(data => {
                    console.log(data)
                    resultHeading.innerHTML = `
                        <h2>Search result for "${term}":</h2>
                    `

                    if (data.meals === null) {
                        resultHeading.innerHTML = `
                        <p>No Search Results 😩</p>
                    `
                    } else {
                        mealsEl.innerHTML = data.meals.map(meal => `   
                                <div class="meal">
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                                    <div class="meal-info" data-mealID="${meal.idMeal}"
                                        <h3>${meal.strMeal}</h3>
                                    </div>
                                </div>
                            `
                        ).join("");
                    }
                });
                searchInput.value= "";
    } else {

    }
}

// Event Listeners
submit.addEventListener("submit", searchMeal);