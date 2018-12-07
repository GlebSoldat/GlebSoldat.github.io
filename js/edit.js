const title = document.querySelector('#title-text')
const textArea = document.querySelector('#steps-area')
const recipeId = location.hash.substring(1)
const recipe = getSavedRecipe()
const ingridients = getSavedIngridients()

ingr(ingridients, recipeId)

let oneRecipe = recipe.find(function (recipe) {
    return recipe.id === recipeId
})

if (oneRecipe === undefined) {
    location.assign('index.html')
}

title.value = oneRecipe.title
textArea.value = oneRecipe.body

title.addEventListener('input', function (e) {
    oneRecipe.title = e.target.value
    saveRecipe(recipe)
})

textArea.addEventListener('input', function (e) {
    oneRecipe.body = e.target.value
    saveRecipe(recipe)
})

renderIngridients(ingr(ingridients, recipeId))

document.querySelector('#form').addEventListener('submit', function (e) {
    e.preventDefault()
    const id = uuidv4()

    ingridients.push({
        id: id,
        pageId: recipeId,
        text: e.target.elements.text.value,
        completed: false
    })
    saveIngridients(ingridients)
    renderIngridients(ingr(ingridients, recipeId))
    generateSubtitleText(ingr(ingridients, recipeId), oneRecipe)
    e.target.elements.text.value = ''
})

document.querySelector('#delete-button').addEventListener('click', function (e) {
    const removeRecipe = recipe.findIndex(function (element) {
        return element.id === recipeId
    })

    if (removeRecipe > -1) {
        recipe.splice(removeRecipe, 1)
        saveRecipe(recipe)
    }

    location.assign(`index-app.html`)
})