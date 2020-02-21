import React from 'react'
import {currencyFormatter} from '../../actions/currencyFormatter'

const Stock = ({symbol, shares, prices}) => {
  let color

  if (prices) {
    if (prices.price > prices.open) color = '#32C74C'
    if (prices.price < prices.open) color = '#FE4B4B'
    if (prices.price === prices.open) color = 'grey'
  }

  const percentShift = (prices) => {
    const p = prices.price
    const o = prices.open
    let shift

    if (o < p) shift = `↑ (${(((p - o) / o) * 100).toFixed(2)}%)`
    if (o > p) shift = `↓ (${(((o - p) / o) * 100).toFixed(2)}%)`
    if (o === p) shift = '←'
    
    return shift
  }


  return (
    <li className='stock'> 
      <span id='ticker'><strong>{symbol}</strong></span>
      <span id='shares'>{shares}</span>
      <span>{shares === 1 ? 'share' : 'shares'}</span>
      <span style={{color: color}}>
        @ {prices ? `${currencyFormatter(prices.price)} ${percentShift(prices)}` : 'Calculating...'}
      </span>
    </li>
  )
}

export default Stock