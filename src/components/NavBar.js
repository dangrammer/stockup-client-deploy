import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  const style = {
    color: '#A5BDA4',
    textShadow: '0.5px 0.5px 1px #8AB588', 
    textDecoration: 'none'
  }

  return (
    <div id='nav-bar'>
      <NavLink className='nav-link' activeStyle={style} to='/portfolio'>Portfolio</NavLink>
      <NavLink className='nav-link' activeStyle={style} to='/transactions'>Transactions</NavLink>
    </div>
  )
}

export default NavBar