import { 
    signIn,
    signUp,
    // indexDeck,
    // createDeck,
    // showDeck,
    // updateDeck,
    // deleteDeck
} from "./api"



const messageContainer = document.getElementById('message-container')
const signUpContainer = document.getElementById('sign-up-form-container')
const signInContainer = document.getElementById('sign-in-form-container')



// User Actions
signUpContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signUp(userData).then(onSignUpSuccess)
    console.log('Heres johnny')
})

signInContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signIn(userData)
		.then((res) => res.json())
        console.log('...were in')
		
})


