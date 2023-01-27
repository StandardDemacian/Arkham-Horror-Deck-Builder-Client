
import { store } from "./store.js"


const messageContainer = document.getElementById("message-container")
const authContainer = document.getElementById('auth-container')
const indexContainer = document.getElementById('index-container')

export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've encountered an error. Try again later</h3>
        <p>${error}</p>
    `
}


// User Actions
export const onSignUpSuccess = () => {
    messageContainer.innerHTML = 'You\'ve created a new user! Now Sign In'
}

export const onSignInSuccess = (userToken) => {
    // messageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('hide')
    indexContainer.classList.remove('hide')
}


//Deck Actions

export const onIndexDeckSuccess = (deck) => {
    deck.forEach((deck) => {
		const div = document.createElement('div')
        div.classList.add('deck-list-button')
		div.innerHTML = `
            <h3>${deck.name}</h3>
            <button type="button" class="btn btn-primary" data-id="${deck._id}">Show Deck List</button>
        `
		indexContainer.appendChild(div)
	})
}

