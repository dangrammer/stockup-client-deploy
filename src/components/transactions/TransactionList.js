import React from 'react'
import {useSelector} from 'react-redux'
import TransactionRecord from './TransactionRecord'

const TransactionList = () => {
  const user = useSelector(state => state.currentUserReducer.currentUser)
  const records = user.attributes.records.sort((a, b) => a.created_at > b.created_at ? -1 : 1)

  const dateFormat = (date) => {
    const YMD = date.split('T')[0].split('-')
    const [y, m, d] = YMD
    return `${m}/${d}/${y}`
  }

  return (
    <div>
      <h1 id='record-title'>Transaction Record</h1>
        {records.length > 0 ?
          <ul>
            {records.map(record => 
              <TransactionRecord 
                key={record.id} 
                symbol={record.symbol}
                shares={record.shares}
                price={record.price}
                date={dateFormat(record.created_at)}
              />
            )}
          </ul> :
            <span className='no-alert'>
              <h2>*No existing transaction records. Start your portfolio!</h2>
            </span>
        }
    </div>
  )
}

export default TransactionList
