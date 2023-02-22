import { store } from './store.js'

// User actions
export const signUp = (data) => {
	return fetch(`https://arkham-horror-server.onrender.com/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`https://arkham-horror-server.onrender.com/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const indexDeck = () => {
    return fetch(`https://arkham-horror-server.onrender.com/deck`,{
    	headers: {
        'Authorization': `Bearer ${store.userToken}`
    	}
	})
}

export const createDeck = (data) => {
    return fetch(`https://arkham-horror-server.onrender.com/deck`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const showDeck = (id) => {
    return fetch(`https://arkham-horror-server.onrender.com/deck/${id}`,{
		headers: {
			'Authorization': `Bearer ${store.userToken}`
		}
	})
}

export const updateDeck = (data, id) => {
    return fetch(`https://arkham-horror-server.onrender.com/deck/${id}`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization' : `Bearer ${store.userToken}`
			},
			body: JSON.stringify(data),
		})
}

export const deleteDeck= (id) => {
    return fetch(`https://arkham-horror-server.onrender.com/deck/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${store.userToken}`
			}
		})
}

export const showCard = (name) => {
	return fetch(`http://localhost:8000/card/${name}`)
}

export const addCard = (data,id) => {
	return fetch(`http://localhost:8000/deck/addcard/${id}`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization' : `Bearer ${store.userToken}`
			},
			body: JSON.stringify({cardId: data}),
		})
}

export const showCardbyId =(id)=> {
	return fetch(`http://localhost:8000/card/id/${id}`)

}