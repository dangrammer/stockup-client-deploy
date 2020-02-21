import {loadPortfolio} from './stockActions'

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  user
})

export const loadProfile = () => {
  const token = localStorage.token
  
  return (dispatch) => {
    if (token) {
      fetch('https://stockup-api.herokuapp.com/profile', {
        //  replace base URL to http://localhost:3000 if running devolopment
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        const userObject = data.user.data
        const stockList = userObject.attributes.stockList

        if (data.user) {
            dispatch(loginUser(userObject))
            dispatch(loadPortfolio(stockList))
        } else {
          localStorage.removeItem('token')
        }
      })
    }
  }
}

export const validateUser = (returningUser, history) => {
  const {email, password} = returningUser

  return (dispatch) => {
    fetch('https://stockup-api.herokuapp.com/login', {
       //  replace base URL to http://localhost:3000 if running devolopment
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        dispatch({type: 'USER_ERRORS', errors: data.errors})
        setTimeout(() => dispatch({type: 'CLEAR_USER_ERRORS'}), 5000)
      } else {
        localStorage.setItem('token', data.token)
        dispatch(loginUser(data.user.data))
        history.push('/portfolio')
      }
    }) 
  }
}

export const createUser = (newUser, history) => {
  const {username, email, password} = newUser

  return (dispatch) => {
    fetch('https://stockup-api.herokuapp.com/users', {
       //  replace base URL to http://localhost:3000 if running devolopment
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        balance: 5000.00
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        dispatch({type: 'USER_ERRORS', errors: data.errors})
        setTimeout(() => dispatch({type: 'CLEAR_USER_ERRORS'}), 5000)
      } else {
        localStorage.setItem('token', data.token)
        dispatch(loginUser(data.user.data))
        history.push('/portfolio')
      }
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_STOCKS'})
    dispatch({type: 'LOGOUT_USER'})
  }
} 

export const adjustBalance = (userId, newBalance) => {
  const token = localStorage.token

  if (token) {
    return (dispatch) => {
      fetch(`https://stockup-api.herokuapp.com/users/${userId}`, {
        //  replace base URL to http://localhost:3000 if running devolopment
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          balance: newBalance 
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          dispatch({type: 'TRANSACTION_ERRORS', errors: ['Balance Error: Please contact financial institution']})
          setTimeout(() => dispatch({type: 'CLEAR_TRANSACTION_ERRORS'}), 5000)
        } else {
          dispatch({type: 'UPDATE_USER', user: data.data})
        }
      })
    }
  }
}