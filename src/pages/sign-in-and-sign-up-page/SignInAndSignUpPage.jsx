import React from 'react'
import Signin from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp'
import './signInAndSignUpPage.scss'

const SignInAndSignUpPage = () => {
  return (
    <div className='sign-in-and-sign-up'>
      <Signin />
      <SignUp />
    </div>
  )
}

export default SignInAndSignUpPage
