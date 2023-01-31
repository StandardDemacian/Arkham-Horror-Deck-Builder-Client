
import { store } from "./store.js"
import { deleteDeck, indexDeck, showDeck,updateDeck } from "./api.js"



const messageContainer = document.getElementById("message-container")
const authContainer = document.getElementById('auth-container')
const indexContainer = document.getElementById('index-container')
const signUpContainer = document.getElementById('sign-up-container')
const homeContainer = document.getElementById('home-container')
const showOneDeck = document.getElementById('show-one-deck')

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
    messageContainer.innerHTML = 'Welcome! Please search for a card in the core set!'
    store.userToken = userToken
    homeContainer.classList.add('hide')
    authContainer.style.display = "none"
    signUpContainer.style.display = "none"
    indexContainer.classList.remove('hide')
    
}


//Deck Actions reactions
// On INDEX SUCCESS ----AFTER SIGN IN THIS HAPPENS
export const onIndexDeckSuccess = (deck) => {
   
    deck.forEach((deck) => {
		const div = document.createElement('div')
        div.classList.add('deck-information')
		div.innerHTML = `
            <h3>${deck.name}</h3>
            <button  type= "submit" class="btn btn-primary" data-id="${deck._id}">Show Deck List</button>
        
        `
        div.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id')
            console.log(id)
            if (!id) return
            showDeck(id)
                    .then((res) => res.json())
                    .then((res) => onShowDeckSuccess(res.deck))
                    .catch(onFailure)
                
        })

		indexContainer.appendChild(div)
       
        
        
	})
}


//Create Deck
export const onCreateDeckSuccess = () => {
    messageContainer.innerText = 'Created a new deck!'
    indexDeck
}

export const onShowDeckSuccess = (deck) => {
    const div = document.createElement('div')
    div.innerHTML = `
        <h3>${deck.name} </h3>
        <p>${deck.Investigator}</p>
        <p>${deck.XP}</p>
        <p>${deck._id}</p>
        <form data-id="${deck._id}">
        <input type="text" name="name" value="${deck.name}">
        <input type="text" name="Investigator" value="${deck.Investigator}">
        <input type="text" name="XP" value="${deck.XP}">
        <input type="submit" value="Update deck">
        </form>
        <button data-id="${deck._id}" id="delete-button">Delete deck</button>
        <button data-id="${deck._id}" id="deck-list"> Deck List</button>
    `
    while(showOneDeck.firstChild) {
        showOneDeck.removeChild(showOneDeck.firstChild)
    }

//DECK LIST BUTTON
    document.getElementById("deck-list").addEventListener('click')


    div.addEventListener('submit', (event) => {
        event.preventDefault()
        const id = event.target.getAttribute('data-id')
        const deckData = {
            deck : {
                name : event.target[0].value,
                Investigator : event.target[1].value,
                XP : event.target[2].value,
               
            }
        }
    
        updateDeck(deckData, id)
            .then(onUpdateDeckSuccess)
            .catch(onFailure)
    })
    
    div.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id')
    
        if (!id) return
    
        deleteDeck(id)
            .then(onDeleteDeckSuccess)
            .catch(onFailure)
    })

    showOneDeck.appendChild(div)
}

//on Card add success

export const onCardAddSuccess = () => {
        messageContainer.innerText = 'Card was added to deck successfully!'
}


// on Update player success 

export const onUpdateDeckSuccess = () => {
    messageContainer.innerText = 'Deck Successfully updated'
}


export const onDeleteDeckSuccess = () => {
    messageContainer.innerText = 'Deck was deleted successfully'
}