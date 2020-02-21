import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadProfile} from './actions/currentUserActions'
import {Route, Redirect} from 'react-router-dom'
import Welcome from './components/Welcome'
import Header from './components/Header'
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUserReducer.currentUser)

  useEffect(() => dispatch(loadProfile()), [dispatch])
  
  return (
    <>
      {Object.keys(currentUser).length > 0 ?
        <>
          <Route component={Header}/>
          <NavBar/>
          <Route component={MainContainer}/>
        </> :
          <>
            <Route exact path='/' component={Welcome}/>
            <Redirect to='/'/>
          </>
      }
    </>
  )
}

export default App
