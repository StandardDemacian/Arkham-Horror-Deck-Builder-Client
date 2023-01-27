import { 
    indexDeck,
    signIn,
    signUp,
    // createDeck,
    // updateDeck,
    // deleteDeck
} from "./api.js"
import {
    onFailure,
    onSignInSuccess,
    onSignUpSuccess,
    onIndexDeckSuccess
} from "./ui.js"


const messageContainer = document.getElementById('message-container')
const signUpContainer = document.getElementById('sign-up-form-container')
const signInContainer = document.getElementById('auth-container')
const cardSearchButton = document.getElementById('cardSearchButton')


// User Actions
signUpContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target[0].value,
			password: event.target[1].value
		},
	}
	signUp(userData)
    .then(onSignUpSuccess)
    .catch(onFailure)
    console.log('Heres johnny')
    console.log(userData)
})

signInContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target[0].value,
			password: event.target[1].value,
		},
	}
	signIn(userData)
		.then((res) => res.json())
		.then((res) => onSignInSuccess(res.token))
		.then(indexDeck)
		.then((res) => res.json())
		.then((res) => onIndexDeckSuccess(res.deck))
		.catch(onFailure)
        console.log('...were in')
})

//Card Fetch Button


cardSearchButton.addEventListener('click', () =>{
    fetch('https://arkhamdb.com/api/public/cards/core')
  .then((response) => response.json())
  .then((data) => console.log(data));
    
})

		



