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
    }
}

function getMealByID(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
            .then(data =>{
                const meal = data.meals[0]
                addMealToDOM(meal)
            })

}

function addMealToDOM(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients:</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                </ul>
            </div>
        </div>
    `
}

// Event Listeners
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meal-info")
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealByID(mealID)
    }
});