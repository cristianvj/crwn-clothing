import React from 'react'
import './customButton.scss'

const CustomButton = ({ children, inverted, isGoogleSignIn, ...otherProps }) => (
  <button 
    className={`
      ${isGoogleSignIn && 'google-sign-in'} 
      ${inverted && 'inverted'}
      custom-button
    `}
    {...otherProps} 
  >
    { children }
  </button>
)

export default CustomButton
