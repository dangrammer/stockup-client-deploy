import {adjustBalance} from './currentUserActions'
import {addStockToPortfolio, increaseShares, checkPrice} from './stockActions'
import {currencyFormatter} from './currencyFormatter'

export const validateTransaction = (symbol, shares, user) => {
  const token = localStorage.token
  const shareQty = parseFloat(shares)
  const balance = parseFloat(user.attributes.balance)
  
  return (dispatch) => {
    if (token) {
      
      if (shareQty < 1 || !Number.isInteger(shareQty)) {
        dispatch({type: 'TRANSACTION_ERRORS', errors: ['Share quantity must be whole integer']})
        setTimeout(() => dispatch({type: 'CLEAR_TRANSACTION_ERRORS'}), 2500)
        return
      } else {
        dispatch({type: 'VALIDATING', switch: true})

      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        const stock = data['Global Quote']
        const price = parseFloat(stock['05. price'])
        const purchaseAmount = price * parseInt(shares)

        if (purchaseAmount <= balance) {
          dispatch({type: 'VALIDATING', switch: false})
          dispatch({
            type: 'PENDING_TRANSACTION', 
            transaction: {
              symbol,
              shares: parseInt(shares),
              price,
              purchaseAmount
            }
          })
        } else {
          dispatch({type: 'VALIDATING', switch: false})
          dispatch({type: 'TRANSACTION_ERRORS', 
            errors: [
              'Insufficient Funds.',
              `Current Balance: ${currencyFormatter(balance)}`,
              `Purchase Amount: ${currencyFormatter(purchaseAmount)}`
            ]
          })
          setTimeout(() => dispatch({type: 'CLEAR_TRANSACTION_ERRORS'}), 5000)
        }
      }) 
      .catch(() => {
        dispatch({type: 'VALIDATING', switch: false})
        dispatch({type: 'TRANSACTION_ERRORS', errors: ['Invalid Ticker Symbol']})
        setTimeout(() => dispatch({type: 'CLEAR_TRANSACTION_ERRORS'}), 2500)
      })
      }
    }
  }
}

export const recordTransaction = (record, stockId) => {
  const token = localStorage.token
  const {symbol, shares, price, userId, balance} = record

  if (token) {
    return (dispatch) => {
      fetch('https://stockup-api.herokuapp.com/transactions', {
        //  replace base URL to http://localhost:3000 if running devolopment
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          symbol,
          shares,
          price,
          user_id: userId
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          dispatch({type: 'TRANSACTION_ERRORS', errors: ['Transaction Failed']})
          setTimeout(() => dispatch({type: 'CLEAR_TRANSACTION_ERRORS'}), 2500)
        } else {
          const newBalance = balance - (price * shares)
          dispatch(adjustBalance(userId, newBalance))
          dispatch(checkPrice(symbol))
          if (stockId) {
            dispatch(increaseShares(stockId, shares))
          } else {
            dispatch(addStockToPortfolio(symbol, shares, userId))
          }
        }
      })
    }
  }
}

// *** come back to this for autcomplete suggestions on purchase form ticker input
// export const fetchQuery = (query) => {
//   const token = localStorage.token

//   return (dispatch) => {
//     if (token) {
//       fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_AV_KEY}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.bestMatches)
//       })
//     }
//   }
// }

