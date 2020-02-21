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
              <span>
                *Disclaimer* If your portfolio is empty or at balance 0 upon logging in to an existing account, or your balance and shares say "Calculating...", or you receive an invalid ticker error while submitting a known ticker to the purchase form: please refresh the page or wait for about 60 seconds for the automatic reload. This application sends a fetch to an external API for current stock prices every 60 seconds, but there are some limitations to the frequency with which the API can be called. Hence, the app is buggy and has load issues. If trying out the application, it is recommended to purchase few stocks, and pace your purchases.
              </span>
            </span>
        }
    </div>
  )
}

export default StockList
