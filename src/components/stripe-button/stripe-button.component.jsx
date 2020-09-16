import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButtom = ({price}) => {
const priceForStripe = price * 100
const publishablekey = 'pk_test_51HS17aKx7jLDBS92FdpJOMOiVpf4tjWqEJ397sI2dx39Y6jWJMo15VjtyAmDuQgiAeYAYcPKymT0xPegku2oplTv00hTr0FuAN'


//https://dashboard.stripe.com/test/apikeys
 const onToken = token =>{
  console.log(token)
  alert('Payment Successful')
}

//https://github.com/azmenak/react-stripe-checkout
  return(
    <StripeCheckout 
    label='Pay Now'
    name='CRWN Clothing Ltd.'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishablekey}
    />
  )
}

export default StripeCheckoutButtom