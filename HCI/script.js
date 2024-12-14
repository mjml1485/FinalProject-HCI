const apiKey = "6460d0698bb3488b9f7b0caec9c53732"; // Replace with your actual API key

// Toggle the menu visibility
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay.classList.toggle('active');
}

// Close the menu
function closeMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay.classList.remove('active');
}

// Adjust font size based on user selection
function adjustFontSize() {
    const selectedSize = document.getElementById('font-size').value + 'px';
    document.body.style.fontSize = selectedSize;
    localStorage.setItem('fontSize', selectedSize); // Store the selected font size in localStorage
}

// Clear recently viewed recipes
function clearRecentlyViewed() {
    localStorage.removeItem('recentlyViewed');
    loadRecentlyViewed();
}

// Load recently viewed recipes from localStorage
function loadRecentlyViewed() {
    const historyContainer = document.getElementById('recentlyViewedList');
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (recentlyViewed.length === 0) {
        historyContainer.innerHTML = "<p>No recently viewed recipes.</p>";
        return;
    }

    historyContainer.innerHTML = recentlyViewed.map(recipe => `
        <li>
            <img src="${recipe.image}" alt="${recipe.title}">
            <span>${recipe.title}</span>
        </li>
    `).join('');
}

// Load recipes based on the category
function loadRecipes(category) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${category}&apiKey=${apiKey}&number=20`;
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = "<p>Loading recipes...</p>";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                recipeContainer.innerHTML = "<p>No recipes found. Please try another category.</p>";
                return;
            }

            recipeContainer.innerHTML = "";
            const seenRecipes = new Set();

            data.results.forEach(meal => {
                if (seenRecipes.has(meal.id)) return;
                seenRecipes.add(meal.id);

                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");

                recipeCard.innerHTML = `
                    <h3>${meal.title}</h3>
                    <img src="${meal.image}" alt="${meal.title}">
                    <button onclick="viewRecipeDetails(${meal.id})">View Details</button>
                `;
                recipeContainer.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error("Error loading recipes:", error);
            recipeContainer.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
        });
}

// Store the recently viewed recipe in localStorage
function addToRecentlyViewed(recipe) {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    if (!recentlyViewed.find(r => r.id === recipe.id)) {
        recentlyViewed.push(recipe);
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
    loadRecentlyViewed(); // Update the view immediately
}

// Update this inside viewRecipeDetails to push data to recently viewed
function viewRecipeDetails(id) {
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = "<p>Loading recipe details...</p>";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meal = data;
            const ingredients = meal.extendedIngredients || [];
            const instructions = meal.instructions || "No instructions available.";

            addToRecentlyViewed({
                id: meal.id,
                title: meal.title,
                image: meal.image
            });

            // Display the details
            const recipeDetails = `
                <div class="recipe-details">
                    <div class="recipe-header">
                        <img src="${meal.image}" alt="${meal.title}">
                        <h3>${meal.title}</h3>
                    </div>
                    <div class="details-container">
                        <div class="ingredients-section">
                            <h4>Ingredients</h4>
                            <ul>
                                ${ingredients.map(ingredient => `
                                    <li><i class="fa fa-check-square"></i> ${ingredient.name}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="instructions-section">
                            <h4>Instructions</h4>
                            <p>${instructions}</p>
                        </div>
                    </div>
                    <button class="back-button" onclick="loadRecipes('${meal.dishTypes?.[0] || "Category"}')">Back to Category</button>
                </div>
            `;
            recipeContainer.innerHTML = recipeDetails;
        })
        .catch(error => {
            console.error("Error fetching recipe details:", error);
            recipeContainer.innerHTML = "<p>Failed to load recipe details. Please try again later.</p>";
        });
}

// Search for recipes based on search input
function searchRecipes() {
    const searchQuery = document.getElementById('search-input').value.trim();
    if (!searchQuery) {
        alert("Please enter a search term.");
        return;
    }
    loadRecipes(searchQuery);
}

// Load initial recipes and recently viewed on page load
window.onload = function() {
    loadRecipes('breakfast'); // Default category to load
    loadRecentlyViewed();

    // Apply stored font size from localStorage
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
        document.body.style.fontSize = storedFontSize;
        document.getElementById('font-size').value = storedFontSize.replace('px', '');
    }
};
