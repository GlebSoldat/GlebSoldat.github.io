const getSavedIngridients = function () {
    const ingridientsTitle = localStorage.getItem('ingridients')

    if (ingridientsTitle !== null) {
        return JSON.parse(ingridientsTitle)
    } else {
        return []
    }
}

// Save
const saveIngridients = function (ingridients) {
    localStorage.setItem('ingridients', JSON.stringify(ingridients))
}

//Remove ingredients

const removeIngridients = function (id) {
    const removeEl = ingridients.findIndex(function (element) {
        return element.id === id
    })

    if (removeEl > -1) {
        ingridients.splice(removeEl, 1)
    }
}

//Complteted ingredients

const toggleIngridient = function (id) {
    const ingridient = ingridients.find(function (element) {
        return element.id === id
    })

    if (ingridient !== undefined) {
        ingridient.completed = !ingridient.completed
    }
}

// Create DOM Element 
const generateIngredientsDOM = function (ingridient) {
    const wrapEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = ingridient.completed

    checkboxEl.addEventListener('change', function () {
        toggleIngridient(ingridient.id)
        saveIngridients(ingridients)
        renderIngridients(ingr(ingridients, recipeId))
        generateSubtitleText(ingr(ingridients, recipeId), oneRecipe)
    })

    const heading = document.createElement('p')

    if (ingridient.text.length > 0) {
        heading.textContent = ingridient.text
    } else {
        heading.textContent = 'Безымянный ингридиент'
    }

    const remove = document.createElement('button')
    remove.textContent = 'Удалить'

    remove.addEventListener('click', function () {
        removeIngridients(ingridient.id)
        saveIngridients(ingridients)
        renderIngridients(ingr(ingridients, recipeId))
    })

    wrapEl.appendChild(checkboxEl)
    wrapEl.appendChild(heading)
    wrapEl.appendChild(remove)

    return wrapEl
}

// Render DOM elements
const renderIngridients = function (ingr) {
    document.querySelector('#ingredients-block').innerHTML = ''

    if (ingr.length > 0) {
        ingr.forEach(function (element) {
            const wrapEl = generateIngredientsDOM(element)
            document.querySelector('#ingredients-block').appendChild(wrapEl)
        })
    } else {
        const emptyEl = document.createElement('p')
        emptyEl.textContent = 'Добавьте ингридиент'
        document.querySelector('#ingredients-block').appendChild(emptyEl)
    }
}

// Subtitle text

const generateSubtitleText = function (ingr, oneRecipe) {
    const completed = ingr.filter(function (element) {
        return element.completed
    })

    const uncompleted = ingr.filter(function (element) {
        return !element.completed
    })

    let total = ''

    if (completed.length === 0) {
        total = 'ничего'
    } else if (uncompleted.length === 0) {
        total = 'все'
    } else {
        total = 'не зватает'
    }

    oneRecipe.total = total
    saveRecipe(recipe)

    return total
}

// Create summary of  ingredients
const ingr = function (ingridient, id) {
    const result = ingridient.filter(function (element) {
        return element.pageId === id
    })
    return result
}
