import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/SignInAndSignUpPage';
import Checkout from './pages/checkout/Checkout';
import Contact from './pages/contact/Contact';


class App extends Component {
  
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if(userAuth){
        const snapshot = await createUserProfileDocument(userAuth)
        
        setCurrentUser({
          id: snapshot.id,
          ...snapshot.data()
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={ <HomePage /> } />
          <Route path='/shop/*' element={ <ShopPage /> } />
          <Route exact path='/checkout' element={ <Checkout /> } />
          <Route exact path='/contact' element={ <Contact /> } />
          <Route
            exact path="signIn"
            element={
              this.props.currentUser ? (
                <Navigate replace to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
