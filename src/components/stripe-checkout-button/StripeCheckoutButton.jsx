import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price *100
  const publishableKey = 'pk_test_51KJPf6HLtAIzmthuFqKJhDoDoUlQvMizkm2XSjoOuoC5wXicqx8jitOKNEttF4c0qtqbk3VadtypKeeHuNIyLscf00wx5NLcz6'

  const onToken = token => {
    console.log(token)
    alert('Payment successful')
  }

  return (
    <StripeCheckout 
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://library.kissclipart.com/20180930/vqq/kissclipart-clothing-store-icon-clipart-computer-icons-clip-ar-4360d5702d6fcc60.png"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}


export default StripeCheckoutButton
