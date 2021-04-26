const container = document.getElementById('container')
const ul = document.querySelector('.user-list')
let errorContainer = document.getElementById('error')
let page = 0
const headers = new Headers({
	"X-Instance": "rainbow",
	"X-Lang": "fr",
	"X-Widget-Version": "3.0.1",
	"Content-Type": "application/json",
	"Accept": "*/*"
})
const currentUrl = window.location.href

let getDatas =  function(page) {
fetch('https://api.rocketfid.com/activity/cache/all/' + page + '/25', {
		method: 'GET',
		headers: headers
	})
	.then(function(response) {
		if(response.ok) {
				return response.json()
		} else {
			errorContainer.textContent = errorText
			console.log('Mauvaise réponse du réseau')
		}
	})
	.then(function(json) {
		json.forEach( (item) => {
			// Création des elements html 
			let li = document.createElement('li')
			let a = document.createElement('a')
			let spanId = document.createElement('span')
			let spanNickname = document.createElement('span')
			let userRole = document.createElement('span')
			let userAvatar = document.createElement('img')

			// Création des attributs
			userAvatar.setAttribute('src', item.performer.media.url)
			a.setAttribute('href', currentUrl + '/user/' + item.performer.id)
			li.setAttribute('class', 'user-item')
			a.setAttribute('class', 'user-link')
			a.setAttribute('href', currentUrl + '/user/' + item.performer.id)
			userAvatar.setAttribute('src', item.performer.media.url)
			userAvatar.setAttribute('class', 'user-avatar')
			userRole.setAttribute('class', 'user-role')
			
			// injection des datas dans les elements
			spanId.textContent = item.id
			spanNickname.textContent += item.performer.nickname
			userRole.textContent = `role : ${item.performer.role}`
			
			// injection dans le rendu html
			a.append(userAvatar, spanNickname, userRole, spanId)
			li.append(a)
			ul.append(li)
		})
	})
	.catch(function(error) {
		let errorText = `Il y a eu un problème avec la requête Ajax : + ${error.message}`
		errorContainer.textContent = errorText
		console.log('Il y a eu un problème avec la requête Ajax : ' + error.message)
	})
}

// On lance la 1ère requête au chargement
window.onload = getDatas
	
getNextDatas = function() {
	window.onscroll = () => {
		let bottomOfWindow = document.documentElement.getBoundingClientRect().top * (-1) + window.innerHeight === document.documentElement.offsetHeight
		if (bottomOfWindow) {
			page += 1
			getDatas(page)
		}
	}
}

getNextDatas()