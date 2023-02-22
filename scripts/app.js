
import { 
    indexDeck,
    signIn,
    signUp,
    createDeck,
	addCard,
	
} from "./api.js"
import {
    onFailure,
    onSignInSuccess,
    onSignUpSuccess,
    onIndexDeckSuccess,
	onCreateDeckSuccess,
	onCardAddSuccess
} from "./ui.js"

const signUpContainer = document.getElementById('sign-up-form-container')
const signInContainer = document.getElementById('auth-container')
const createDeckForm = document.getElementById('create-deck-form-container')
const cardSearchInput = document.getElementById('card-search-form')
const cardListRemovable = document.getElementById('card-list-removable')
const cardSearchMainContainer = document.getElementById('card-search-container')

// Sign Up
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
})

//sign in + indexs the decks 
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
})

//Card Search Box + management
cardSearchInput.addEventListener('submit', (event) =>{
	event.preventDefault()
		while(cardListRemovable.firstChild) {
			cardListRemovable.removeChild(cardListRemovable.firstChild)
			}
	const cardName = event.target[0].value

	const showCardByName = (cardName) => {
		fetch(`https://arkham-horror-server.onrender.com/card/${cardName}`)
		.then(res => res.json())
		.then((data)=>onGetCardSuccess(data))
		.catch(err => console.error(err))
			}

	const onGetCardSuccess = (card) => { 
		const foundCard = document.createElement('div')
			foundCard.classList.add('card-display')
			foundCard.innerHTML = `
				<img src = "https://arkhamdb.com/${card.card.imagesrc}" id=card-art>
				`
		foundCard.setAttribute('data-url',card)
		const cardText = document.createElement('div')
				cardText.innerHTML = `
				<br>
				<p>${card.card.text}</p>
				`
		const addCardForm = document.createElement('div')
			addCardForm.classList.add('add-card')
			addCardForm.setAttribute('data-id',card._id)
			addCardForm.innerHTML = `
				<form id = "add-card-form">
				<input type="text" name="deck-id" class="form-control" placeholder="DeckId#">
          		<br>
          		<button data-id = "${card._id}"  type="submit" class="btn btn-primary">Add Card to Deck</button>
				</form>
				`
		addCardForm.addEventListener('submit', (event) => {
			event.preventDefault()
			const deckId = event.target[0].value
			const cardData = card.card._id
			addCard(cardData, deckId)
			onCardAddSuccess()
			
		})

		cardListRemovable.appendChild(foundCard)
		cardListRemovable.appendChild(cardText)
		cardListRemovable.appendChild(addCardForm)
		cardSearchMainContainer.appendChild(cardListRemovable)
	}
			
	showCardByName(cardName)

})


// Create Deck Function 

createDeckForm.addEventListener('submit', (event)=>{
	event.preventDefault()
	const deckData = {
		deck : {
			name : event.target[0].value,
			Investigator : event.target[1].value,
			XP : event.target[2].value,
			class: event.target[3].value
		}
	}
	createDeck(deckData)
			.then(onCreateDeckSuccess)
			.then(indexDeck)
			.then((res) => res.json())
			.then((res) => onIndexDeckSuccess(res.deck))
			.catch(onFailure)
})




