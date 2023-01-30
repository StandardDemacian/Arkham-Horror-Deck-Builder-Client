
import { 
    indexDeck,
    signIn,
    signUp,
    createDeck,
    // deleteDeck
} from "./api.js"
import {
    onFailure,
    onSignInSuccess,
    onSignUpSuccess,
    onIndexDeckSuccess,
	onCreateDeckSuccess
} from "./ui.js"


const signUpContainer = document.getElementById('sign-up-form-container')
const signInContainer = document.getElementById('auth-container')
const createDeckForm = document.getElementById('create-deck-form-container')
const deckInfo = document.getElementsByClassName('fucking-work')


console.log(deckInfo)
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




// Create Deck Function 

createDeckForm.addEventListener('submit', (event)=>{
	event.preventDefault()
	const deckData = {
		deck : {
			name : event.target[0].value,
			Investigator : event.target[1].value,
			XP : event.target[2].value
		}
	}

	createDeck(deckData)
			.then(onCreateDeckSuccess)
			.then(indexDeck)
			.then((res) => res.json())
			.then((res) => onIndexDeckSuccess(res.deck))
			.catch(onFailure)
       		 console.log('...building')
	
	
})
