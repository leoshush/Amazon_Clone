const functions = require('firebase-functions')
const express =require("express");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51OB61lSIReqVYUxHCn35TmGWUpfB66cBHBKfeADGpVZ2ZcleJyAzCYRWg6TMRs726gztIs2QoAEEgtGvKtoI3llR00WPqMSj1g');
// API 
// App config
 const app = express()

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

// API routes

app.get('/',(request,response) => response.status(200).send('hello world'))
app.post("http://127.0.0.1:5001/clone-app-43957/us-central1/api/payments/create", async(request, response)=>{
    var total = request.query.total;
    console.log('Payment request received boom!',total)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency:"usd",  
      confirm : true     
    });  
    //OK-created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    }); 
});
// Listen command
exports.api = functions.https.onRequest(app)