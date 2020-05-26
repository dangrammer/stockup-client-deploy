import React from 'react'
import {useSelector} from 'react-redux'
import Stock from './Stock'


const StockList = () => {
  const stocks = useSelector(state => state.stockReducer.stocks)
  const prices = useSelector(state => state.stockReducer.prices)

  stocks.sort((a, b) => a.symbol.localeCompare(b.symbol))

  return (
    <div id='stock-list'>
      {stocks.length > 0 ?
          <ul>
            {stocks.map(stock => 
              <Stock 
                key={stock.id} 
                symbol={stock.symbol}
                shares={stock.shares}
                prices={prices.find(p => p.symbol === stock.symbol)}
              />
            )}
          </ul> :
            <span className='no-alert'>
              <h3>*No Stocks In Your Portfolio</h3>
            </span>
        }
    </div>
  )
}

export default StockList
