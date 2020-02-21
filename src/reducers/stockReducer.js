const initialState = {
  stocks: [],
  prices: [],
  totalEarnings: null,
  errors: []
}

const stockReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOAD_PORTFOLIO':
      return {...state, stocks: action.stocks}  

    case 'ADD_STOCK':
      return {...state, stocks: [...state.stocks, action.stock]}

    case 'ADD_PRICE':
      let prices = state.prices.filter(price => price.symbol !== action.price.symbol)
      prices.push(action.price)
      return {...state, prices: prices}  

    case 'INCREASE_SHARES':
      let stocks = state.stocks.filter(stock => stock.id !== action.stock.id)
      stocks.push(action.stock)
      return {...state, stocks: stocks}

    case 'SET_TOTAL_EARNINGS':
      // this was an attempt to solve a datatype issue when loading prices, still working
      // let total 

      // if (action.total.includes(NaN)) {
      //   total = null
      // } else if (action.total.length === 1) {
      //   total = action.total[0]
      // } else if (action.total.length === 0) {
      //   total = 0
      // } else {
      //   total = action.total.reduce((t, n) => t + n)
      // }
      return {...state, totalEarnings: action.total}

    case 'RESET_STOCKS':
      return initialState  

    case 'STOCK_ERRORS':
      return {...state, errors: action.errors}  

    case 'CLEAR_STOCK_ERRORS':
      return {...state, errors: []}  

    default:
     return state
  }
}  

export default stockReducer
