import React from "react";

import "./Product.css";
import { useStateValue } from "./StateProvider";
// import image from "/https://m.media-amazon.com/images/I/81-QB7nDh4L._SY342_.jpg"
function Product(props) {
   const [{basket},dispatch] = useStateValue();
   const addToBasket = () =>{
    //dispatch the item into the data layer
     dispatch({
        type:'ADD_TO_BASKET',
        item:{
            id:props.id,
            title:props.title,
            image:props.image,
            price:props.price,
            rating:props.rating
        }
     })  
}
    return (
    <div className="product">
      <div className="product_info">
        <strong>{props.title}</strong>
        <p className="product_price">
           <strong>$</strong>
           <strong>{props.price}</strong>
        </p>
        <div className="product_rating">
          {Array(props.rating).fill().map((_,i)=>(
            <span>⭐</span>
          ))}

        </div>
       </div>
       <img src={props.image} alt=""/>
      <button onClick={addToBasket} >Add to Basket</button>


    </div>

  );
}

export default Product;
