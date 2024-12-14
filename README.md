# FinalProject-HCI

Overview
REstCIPES is a recipe search and viewing tool. It allows users to search for recipes, view details about specific recipes, adjust the font size of the content, and track recently viewed recipes. The Spoonacular API is used to fetch recipe data.

HTML Structure
•	Header: Contains the title "REstCIPES" and a description of “Explore food recipes when you have time and you are resting”. Also includes a menu icon that toggles the sidebar menu.
•	Navigation: Provides buttons for different meal categories (Breakfast, Lunch, Dinner, Midnight Snacks).
•	Menu Sidebar: Contains settings for adjusting the font size and viewing recently viewed recipes. Includes a clear button to clear the recently viewed recipes.
•	Main Content: Consists of a search container for searching recipes and a recipe container where the search results are displayed. When the user searched for a food recipe and it appears “No recipe found” it is due to limited resources since The Spoonacular API have limited list of recipes and unable to load all.

CSS Styling
General styles are applied to body, header, navigation, search container, recipe list, recipe card, sidebar menu, buttons, and recipe details.
Styling ensures a responsive and visually appealing layout with appropriate padding, margins, colors, and font sizes.
Flexbox and grid layouts are used for alignment and spacing.

JavaScript Logic
API Key: The API key is defined for Spoonacular API.
Toggle Menu: Functions to open (toggleMenu) and close (closeMenu) the sidebar menu.
Adjust Font Size: Function to adjust the font size of the content based on user selection. The selected font size is stored in localStorage.
Clear Recently Viewed: Function to clear the recently viewed recipes from localStorage and update the view.
Load Recently Viewed: Function to load recently viewed recipes from localStorage and display them in the sidebar.
Load Recipes: Function to load recipes based on the selected category or search query. Fetches data from Spoonacular API and displays the results.
View Recipe Details: Function to view details of a specific recipe. Fetches detailed data from Spoonacular API and displays it. Also updates the recently viewed recipes.
Search Recipes: Function to search recipes based on user input.
Window Onload: Initializes the page with default recipes and applies stored font size.

API Usage
Spoonacular API: The application uses the Spoonacular API to fetch recipes and detailed information about specific recipes.
 
Endpoints Used:
https://api.spoonacular.com/recipes/complexSearch: For searching recipes based on category or query.
https://api.spoonacular.com/recipes/{id}/information: For fetching detailed information about a specific recipe.

Flow of the Web Application
Page Load: When the page loads, the default category Breakfast recipes are fetched and displayed. 
User Interactions:
Navigation: Users can click on category buttons (Breakfast, Lunch, etc.) to load recipes for that category. 
Search: Users can enter a query in the search bar and click the search button to fetch recipes matching the query.
View Details: Users can click on "View Details" for a specific recipe to see detailed information. This action also adds the recipe to the recently viewed list. 
Font Size Adjustment: Users can adjust the font size from the sidebar menu.
Clear Recently Viewed: Users can clear the recently viewed recipes from the sidebar menu.





