// Read existing recipes from localStorage
const getSavedRecipe = function () {
    const recipeJson = localStorage.getItem('recipe')

    if (recipeJson !== null) {
        return JSON.parse(recipeJson)
    } else {
        return []
    }
}

// Save notes
const saveRecipe = function (recipe) {
    localStorage.setItem('recipe', JSON.stringify(recipe))
}

// Create DOM Element
const generateRecipeDOM = function (recipe) {
    const recipeEl = document.createElement('div')
    const recipeTitle = document.createElement('a')
    const recipeText = document.createElement('p')

    if (recipe.title.length > 0) {
        recipeTitle.textContent = recipe.title
    } else {
        recipeTitle.textContent = 'Unnamed recipe'
    }

    recipeText.textContent = `You have ${recipe.total} of the ingredients`

    recipeEl.appendChild(recipeTitle)
    recipeEl.appendChild(recipeText)
    recipeTitle.setAttribute('href', `edit.html#${recipe.id}`)
    recipeEl.classList.add('recipe-card')

    return recipeEl
}

// Render recipe
const renderRecipe = function (recipe, filter) {
    const recipeFilter = recipe.filter(function (recipe) {
        return recipe.title.toLowerCase().includes(filter.filterText.toLowerCase())
    })

    document.querySelector('#add-block').innerHTML = ''

    if (recipe.length > 0) {
        recipeFilter.forEach(function (recipe) {
            const recipeEl = generateRecipeDOM(recipe)
            document.querySelector('#add-block').appendChild(recipeEl)
        })
    } else {
        const holeEl = document.createElement('p')
        holeEl.textContent = 'Add your first recipe'
        document.querySelector('#add-block').appendChild(holeEl)
    }
}
