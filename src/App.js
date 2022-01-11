import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/SignInAndSignUpPage';

import { onAuthStateChanged } from 'firebase/auth'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends Component {
  
  constructor() {
    super()
    
    this.state = {
      currentUser: null,
    }
  }
  
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if(userAuth){
        const snapshot = await createUserProfileDocument(userAuth)
        
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        })
      } else {
        this.setState( {currentUser: userAuth} )
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/signin' element={<SignInAndSignUpPage/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
