
import { store } from "./store.js"
import { deleteDeck, indexDeck, showDeck,updateDeck,showCardbyId } from "./api.js"



const messageContainer = document.getElementById("message-container")
const authContainer = document.getElementById('auth-container')
const indexContainer = document.getElementById('index-container')
const signUpContainer = document.getElementById('sign-up-container')
const homeContainer = document.getElementById('home-container')
const showOneDeck = document.getElementById('show-one-deck')
const decklistremovable = document.getElementById('deck-list-removable')
const cardsInDeck = document.getElementById('cards-in-deck')
const cardSearchcontainer = document.getElementById('card-search-container')
const classIcon = document.getElementById('class-icon-container')


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
    decklistremovable.classList.remove('hide')
    cardSearchcontainer.classList.remove('hide')

    
}

//Deck Actions reactions
// On INDEX SUCCESS ----AFTER SIGN IN THIS HAPPENS
export const onIndexDeckSuccess = (deck) => {

    deck.forEach((deck) => {
		const deckinfo = document.createElement('div')
        deckinfo.classList.add('deck-information')
		deckinfo.innerHTML = `
            <h3>${deck.name}</h3>
            <button  type= "submit" class="btn btn-primary" data-id="${deck._id}">Show Deck Contents</button>
        
        `
        deckinfo.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id')
            if (!id) return
            showDeck(id)
                    .then((res) => res.json())
                    .then((res) => onShowDeckSuccess(res.deck))
                    .catch(onFailure)

        })
		decklistremovable.appendChild(deckinfo)   
	})
}

//Create Deck
export const onCreateDeckSuccess = () => {
    messageContainer.innerText = 'Created a new deck!'
    while(decklistremovable.firstChild) {
        decklistremovable.removeChild(decklistremovable.firstChild)
    }
    
}
//function that gets a card by its name field
const getCardName = (cardData) => {
    const deckCards = document.createElement('div')
    const cardName = cardData.card.name
    deckCards.innerHTML = `
    <p style = "font-size: 20px">${cardName}<p>
    `
    cardsInDeck.append(deckCards)
    cardsInDeck.classList.remove('hide')

}

//shows decks + adds event listeners and divs for showOne, Delete, and Create
export const onShowDeckSuccess = (deck) => {

    for(let i = 0; i<deck.cards.length; i++){
        showCardbyId(deck.cards[i])
        .then(res => res.json())
        .then(cardData => (getCardName(cardData)))
    }

    const div = document.createElement('div')
    div.innerHTML = `
        <h3>${deck.name} </h3>
        <p> Ivestigator: ${deck.Investigator}</p>
        <p>XP: ${deck.XP}</p>
        <p>class: ${deck.class}</p>
        <p>Deck ID: ${deck._id}</p>
        <form data-id="${deck._id}">
        <input type="text" name="name" value="${deck.name}">
        <input type="text" name="Investigator" value="${deck.Investigator}">
        <input type="text" name="XP" value="${deck.XP}">
        <input type="text" name="class" value="${deck.class}">
        <input type="submit" value="Update deck">
        </form>
        <button data-id="${deck._id}" id="delete-button">Delete deck</button>
    
    `

    switch (deck.class) {
  
        case
            "Rogue":
                classIcon.innerText = 'T'
                classIcon.classList = ''
                classIcon.classList.add('rogue-icon')
                    break;
        case
            "Guardian":
                classIcon.innerText = 'Q'
                classIcon.classList = ''
                classIcon.classList.add('guardian-icon')
                    break;  
        case
            "Survivor":
                classIcon.innerText = 'R'
                classIcon.classList = ''
                classIcon.classList.add('survivor-icon')
                    break;
     
        case
            "Mystic":
                classIcon.innerText = 'W'
                classIcon.classList = ''
                classIcon.classList.add('mystic-icon')
                    break; 
        case
            "Seeker":
                classIcon.innerText = 'E'
                classIcon.classList = ''
                classIcon.classList.add('seeker-icon')
                    break;
        }       

   
    while(showOneDeck.firstChild) {
        showOneDeck.removeChild(showOneDeck.firstChild)
    }
    //Update Deck
    div.addEventListener('submit', (event) => {
        event.preventDefault()
        const id = event.target.getAttribute('data-id')
        const deckData = {
            deck : {
                name : event.target[0].value,
                Investigator : event.target[1].value,
                XP : event.target[2].value,
               class: event.target[3].value
            }
        }
        
        updateDeck(deckData, id)
            .then(onUpdateDeckSuccess)
            .then(indexDeck)
			.then((res) => res.json())
			.then((res) => onIndexDeckSuccess(res.deck))
            .catch(onFailure)

            while(decklistremovable.firstChild) {
                decklistremovable.removeChild(decklistremovable.firstChild)
                        }
    })
    
    div.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id')
    
        if (!id) return
    
        deleteDeck(id)
            .then(onDeleteDeckSuccess)
            .then(indexDeck)
			.then((res) => res.json())
			.then((res) => onIndexDeckSuccess(res.deck))
			.catch(onFailure)
            while(decklistremovable.firstChild) {
                decklistremovable.removeChild(decklistremovable.firstChild)
            }

            
    })

    showOneDeck.appendChild(div)
}

//on Card add success
export const onCardAddSuccess = () => {
        messageContainer.innerText = 'Card was added to deck successfully!'
        indexDeck()
}

// on Update player success 
export const onUpdateDeckSuccess = () => {
    messageContainer.innerText = 'Deck Successfully updated'
    while(showOneDeck.firstChild) {
        showOneDeck.removeChild(showOneDeck.firstChild)
    }
}

export const onDeleteDeckSuccess = () => {
    messageContainer.innerText = 'Deck was deleted successfully'
    while(showOneDeck.firstChild) {
        showOneDeck.removeChild(showOneDeck.firstChild)
    }
}