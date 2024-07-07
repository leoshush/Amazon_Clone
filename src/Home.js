import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=''></img>
        <div className="home_row">
          <Product
            id="12321341"
            title="The lean startup"
            price={29.99}
            image="https://m.media-amazon.com/images/I/81-QB7nDh4L._SY342_.jpg"
            rating={3}
          />
          <Product
            id="49538094"
            title="Kenwood KMix Stand Mixer for Baking,Stylish Kitchen Mixer with K-beater , Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="data:image/jpeg;base64,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"
          />
        </div>
        <div className="home_row">
        <Product
          id="4903850"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
          price={199.99}
          rating={3}
          image="https://img1.gadgetsnow.com/gd/images/products/original/G423421.jpg"
        />
           <Product
          id="23445930"
          title="Amazon Echo (3rd Generation) | Smart speaker with Alexa ,Charcoal Fabric"
          price={98.99}
          rating={5}
          image="https://images-eu.ssl-images-amazon.com/images/I/61EXU8BuGZL._AC_UL116_SR116,116_.jpg"
        />
           <Product
          id="3254354345"
          title=" New Apple iPad Pro (12.9-inch ,Wi-Fi,128 GB)-Silver (4th Generation)"
          price={598.99}
          rating={4}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBSVJY0fVEzgrmY6M1nJa-H0-wmxwbKrEEVObAvtpJjViPPxnTzAf&usqp=CAE&s"
        />
          
        </div>
        <div className="home_row">
        <Product
          id="90829332"
          title="Samsung LC4RG90SSUXEN 49' Curved LED Gaming Monitor -Super Ultra Wide Dual WQHD 5120 X 1440 "
          price={1094.98}
          rating={4}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Xvjh4Q1vbHlS4iVaeGvvrxYwMmjqRyPNJQ&usqp=CAU"
        />
        </div>
      </div>
    </div>
  );
}

export default Home;
