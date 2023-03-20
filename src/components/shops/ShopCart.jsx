import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { CartService } from '../../api/service/cart';

const ShopCart = ({ shopItems }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const addToCart = async (id) => {
    setLoading(true);
    const res = await CartService.addProduct(id, 1);
    setTimeout(() => setLoading(false), 500);
    return res.data;
  };

  return (
    <>
      {loading && <Spinner />}
      {shopItems.map((item, index) => {
        return (
          <div className='box' key={index}>
            <div className='product mtop'>
              <div className='img'>
                <span className='discount'>{10}% Off</span>
                <Link to={`/product/${item.id}`}>
                  <img src={item.images} alt='' />
                </Link>
                <div className='product-like'>
                  <label>{count}</label> <br />
                  <i className='fa-regular fa-heart' onClick={increment}></i>
                </div>
              </div>
              <div className='product-details'>
                <h3>{item.product_name}</h3>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price'>
                  <h4>${item.price}.00 </h4>
                  {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                  <button onClick={() => addToCart(item.id)}>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
