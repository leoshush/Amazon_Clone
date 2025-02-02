import React, { useEffect, useState } from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from "./axios";
import {db} from "./firebase"
function Payment() {
  const [{ basket, user },dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] =useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] =useState("");


  useEffect(()=>{
    //generate the special stripe secret which allows us to charge a customer 
    const getClientSecret = async () => {
     const response = await axios({
       method:'post',
       //stripe expect a total in currencies subunits
       url: `http://127.0.0.1:5001/clone-app-43957/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`
     });
     setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  },[basket])
  console.log('The secret is >>>', clientSecret)
  
  const handleSubmit = async(event) => { 
   event.preventDefault();
   setProcessing(true);

   const payload = await stripe.confirmCardPayment(clientSecret, {
    payment_method:{
      card: elements.getElement(CardElement)
    }
   }).then(({paymentIntent}) => {
     // paymentIntent = payment confirmation
     if(paymentIntent.error){
      setError(`Payment failed`)
     }

    //  db 
    //    .collection('users')
    //    .doc(user?.uid)
    //    .collection('orders')
    //    .doc(paymentIntent.id)
    //    .set({
    //     basket:basket,
    //     amount:paymentIntent.amount,
    //     created:paymentIntent.created
    //    })
     setSucceeded(true);
     setError(null);
     setProcessing(false);
     navigate('/orders',{replace:true})

     dispatch({
     type: 'EMPTY_BASKET'
     })
   })

  }
  const handleChange = (event) => {
    // Listen for the changes in CardElement 
    //and display errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error? event.error.message : "")
  }
  return (
    <div className='payment'>
      <div className='payment_container'>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/*Payment section -delivery address */}
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment_address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/*Payment section -Review Items */}
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Review Items and delivery</h3>
          </div>
          <div className='payment_items'>
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />

            ))}
          </div>
        </div>
        <div className='payment_section'>
          <div className='payment_title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment_details'>
            {/* Stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment_priceContainer'>
               <CurrencyFormat
               renderText={(value) => (
                
                <h3>Order Total:{value}</h3>
               )}
               decimalScale={2}
               value={getBasketTotal(basket)}
               displayType={"text"}
               thousandSeparator={true}
               prefix={"$"}
               />
               <button disabled={processing || disabled || succeeded}>
               <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
               </button>
              </div>
             {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment