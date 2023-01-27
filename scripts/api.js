import { store } from './store.js'

// User actions
export const signUp = (data) => {
	return fetch(`http://localhost:8000/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`http://localhost:8000/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}
export const indexDeck = () => {
    return fetch(`http://localhost:8000/deck`)
}

export const createDeck = (data) => {
    return fetch(`http://localhost:8000/deck`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const showDeck = (id) => {
    return fetch(`http://localhost:8000/deck/${id}`)
}

export const updateDeck = (data, id) => {
    return fetch(`http://localhost:8000/deck/${id}`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
}

export const deleteDeck= (id) => {
    return fetch(`http://localhost:8000/deck/${id}`, {
			method: 'DELETE'
		})
}

