const searchInput = document.querySelector('#search')
const cross = document.querySelector('.cross')
const recipe = getSavedRecipe()

const filter = {
	filterText: ''
}

renderRecipe(recipe, filter)

document.querySelector('#add-button').addEventListener('click', function (e) {
	const id = uuidv4()

	recipe.push({
		id: id,
		title: '',
		body: '',
		total: 'none'
	})
	saveRecipe(recipe)
	location.assign(`edit.html#${id}`)
})

searchInput.addEventListener('input', function (e) {
	if (searchInput.value.length > 0) {
		cross.style.display = 'block'
	} else {
		cross.style.display = 'none'
	}
	filter.filterText = e.target.value
	renderRecipe(recipe, filter)
})

document.querySelector('.cross').addEventListener('click', function (e) {
	cross.style.display = 'none'
	searchInput.value = ''
	filter.filterText = searchInput.value
	renderRecipe(recipe, filter)
})