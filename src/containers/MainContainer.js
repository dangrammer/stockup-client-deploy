import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import PortfolioContainer from './PortfolioContainer'
import TransactionList from '../components/transactions/TransactionList'
import {checkPrice} from '../actions/stockActions'

const MainContainer = () => {
  const dispatch = useDispatch()
  const stocks = useSelector(state => state.stockReducer.stocks)

// should set interval and checkPrice be done in App.js???
  useEffect(() => {
    let priceCheck = setInterval(() => {
      stocks.forEach(stock => dispatch(checkPrice(stock.symbol)))
      console.log('price check')
    }, 60000)
    return () => {
      clearInterval(priceCheck)
    }
  }, [dispatch, stocks])
 
  stocks.forEach(stock => dispatch(checkPrice(stock.symbol)))
  

  return (
    <div id='main'>
      <Switch>
        <Route path='/portfolio' component={PortfolioContainer}/>
        <Route path='/transactions' component={TransactionList}/>
        <Redirect to='/portfolio'/>
      </Switch>
    </div>
  )
}

export default MainContainer