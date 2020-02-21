import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {validateTransaction, recordTransaction} from '../../actions/transactionActions'
import {currencyFormatter} from '../../actions/currencyFormatter'

const PurchaseForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUserReducer.currentUser)
  const validating = useSelector(state => state.transactionReducer.validating)
  const transaction = useSelector(state => state.transactionReducer.transaction)
  const errors = useSelector(state => state.transactionReducer.errors)

  const [tickerSymbol, setTickerSymbol] = useState('')
  const [shareQty, setShareQty] = useState('')

  const {symbol, shares, price, purchaseAmount} = transaction

  const clearForm = () => {
    setTickerSymbol('')
    setShareQty('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(validateTransaction(tickerSymbol, shareQty, user))
  }
  
  const handleClick = (event) => {
    if (event.target.id === 'confirm-btn') {
      const balance = parseFloat(user.attributes.balance)
      const record = {symbol, shares, price, userId: parseInt(user.id), balance}
      const stock = user.attributes.stockList.find(stock => stock.symbol === symbol)
      const stockId = stock ? stock.id : null

      dispatch(recordTransaction(record, stockId))
      clearForm()
    } 
    dispatch({type: 'COMPLETED_TRANSACTION'})
  }

  return (
    <div id='purchase-form'>
      <h4 id='purchase-title'>Purchase Form</h4>
      {!purchaseAmount ? 
        <div id='search'>
          <ul id='purchase-errors'>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          {validating ? <span>Validating . . .</span> : null}
          <form id='search-form' onSubmit={handleSubmit}>
            <input
              className='search-input'
              type='text'
              value={tickerSymbol}
              placeholder='Ticker Symbol'
              onChange={event => setTickerSymbol(event.target.value.toUpperCase())}
            />
            <br/>
            <input
              className='search-input'
              type='number'
              value={shareQty}
              placeholder='Shares (QTY)'
              onChange={event => {
                if (Number.isInteger(parseFloat(event.target.value))) {
                  setShareQty(event.target.value)
                } else {
                  setShareQty(event.target.value.split('.')[0])
                }
              }}
            />
            <br/>
            <input className='search-input btn' type='submit' value='Buy'/>
          </form>
        </div> :
          <div id='confirm-purchase'>
            <span>
              Purchasing <strong>{symbol}</strong> 
              <br/>
              {shares} {shares > 1 ? 'shares' : 'share'} @ USD {currencyFormatter(price)} 
              <br/>
              <br/>
              Purchase Amount: 
              <br/>
              USD <strong>{currencyFormatter(purchaseAmount)}</strong> 
              <br/>
              <br/>
            </span>
            <button id='confirm-btn' className='btn checkout' onClick={handleClick}>Confirm Purchase</button> 
              <br/>
              <br/>
            <button id='cancel-btn' className='btn checkout' onClick={handleClick}>Cancel Purchase</button> 
          </div>
      }
    </div>
  )
}

export default PurchaseForm