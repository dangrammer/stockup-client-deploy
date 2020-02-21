import React from 'react'
import {Route} from 'react-router-dom'
import About from './About'
import Login from './Login'

const Welcome = () => {
  
  return (
    <div id='welcome'>
      <About/>
      <Route component={Login}/>
    </div> 
  )
}

export default Welcome
