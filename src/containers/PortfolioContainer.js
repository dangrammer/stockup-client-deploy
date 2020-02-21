import React, {useEffect} from 'react'
import CashBalance from '../components/portfolio/CashBalance'
import PurchaseForm from '../components/portfolio/PurchaseForm'
import StockList from '../components/portfolio/StockList'

import {useDispatch, useSelector} from 'react-redux'
import {setTotalEarnings} from '../actions/stockActions'
import {currencyFormatter} from '../actions/currencyFormatter'

const PortfolioContainer = () => {
  const dispatch = useDispatch()
  const stocks = useSelector(state => state.stockReducer.stocks)
  const prices = useSelector(state => state.stockReducer.prices)
  const totalEarnings = useSelector(state => state.stockReducer.totalEarnings)
  const errors = useSelector(state => state.stockReducer.errors)

  useEffect(() => dispatch(setTotalEarnings(stocks, prices)), [dispatch, stocks, prices])

  return (
    <div id='portfolio'>
      <div>
        <h1 id='portfolio-title'>Portfolio</h1>
        <ul id='portfolio-errors'>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <span>
          {'TOTAL EARNINGS: USD '} 
          <strong>
            {/* still working out this render */}
            {/* {totalEarnings === null ? 'calculating...' : currencyFormatter(totalEarnings)} */}
            {typeof totalEarnings !== 'number' || totalEarnings === NaN ? 'calculating...' : currencyFormatter(totalEarnings)}
          </strong>
        </span>
        <StockList/>
      </div>
      <div id='market'>
        <CashBalance/>
        <PurchaseForm/>
      </div>
    </div>
  )
}

export default PortfolioContainer
