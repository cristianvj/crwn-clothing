import React, { Component } from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './signUp.scss'

class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    
    const { displayName, email, password, confirmPassword } = this.state

    if(password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      await createUserProfileDocument(user, { displayName })

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({ [name] : value })
  }

  render() {

    const { displayName, email, password, confirmPassword } = this.state

    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign In with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleInputChange}
            label='DisplayName'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleInputChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleInputChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleInputChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
