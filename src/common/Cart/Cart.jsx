import React, { useEffect, useReducer } from 'react';
import { CartService } from '../../api/service/cart';
import { ProductService } from '../../api/service/product';
import './style.css';
import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCartInfo': {
      return { ...state, cartInfo: action.payload };
    }
    case 'setCartItems': {
      return { ...state, cartItems: action.payload };
    }
    default: {
      return state;
    }
  }
};

const Cart = () => {
  const [cart, dispatch] = useReducer(reducer, { cartInfo: {}, cartItems: [] });
  const { cartInfo, cartItems } = cart;
  const [loading, setLoading] = useState(false);

  const addToCart = async (id) => {
    setLoading(true);
    const res = await CartService.addProduct(id, 1);
    setTimeout(() => setLoading(false), 300);
    getCartInfo();
    return res.data;
  };

  const removeFromCart = async (id) => {
    setLoading(true);
    const res = await CartService.removeProduct(id);
    setTimeout(() => setLoading(false), 300);
    getCartInfo();
    return res.data;
  };

  const getCartItems = async (arr) => {
    const result = [];
    if (arr) {
      await arr.map(async (item) => {
        const cartItem = await ProductService.getProductDetail(item.product);
        console.log(item.id, cartItem);
        const { id, images, price, product_name } = cartItem.data;
        result.push({
          id,
          images: images.slice(7).replace('%3A', ':/'),
          price,
          product_name,
          qty: item.quantity,
          cartItem_id: item.id,
        });
        dispatch({ type: 'setCartItems', payload: result });
      });
    } else {
      dispatch({ type: 'setCartItems', payload: [] });
    }
  };

  const getCartInfo = async () => {
    setLoading(true);
    const res = await CartService.getCartItems();
    getCartItems(res.data.cart_items);
    setTimeout(() => setLoading(false), 550);
    dispatch({ type: 'setCartInfo', payload: res.data });
  };

  useEffect(() => {
    getCartInfo();
  }, []);

  return (
    <section className='cart-items'>
      {loading && <Spinner />}
      <div className='container d_flex'>
        <div className='cart-details'>
          {cartItems.length === 0 && (
            <h1 className='no-items product'>No Items are add in Cart</h1>
          )}
          {cartItems.map((item) => {
            const productQty = item?.price * item?.qty;

            return (
              <div
                className='cart-list product d_flex'
                key={item?.id + Math.random()}
              >
                <div className='img'>
                  <img src={item?.images} alt='' />
                </div>
                <div className='cart-details'>
                  <h3>{item?.product_name}</h3>
                  <h4>
                    ${item?.price}.00 * {item?.qty}
                    <span>${productQty}.00</span>
                  </h4>
                </div>
                <div className='cart-items-function'>
                  <div className='removeCart'>
                    <button
                      className='removeCart'
                      onClick={() => removeFromCart(item.cartItem_id)}
                    >
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </div>
                  <div className='cartControl d_flex'>
                    <button
                      className='incCart'
                      onClick={() => addToCart(item.id)}
                    >
                      <i className='fa-solid fa-plus'></i>
                    </button>
                    <button
                      className='desCart'
                      // onClick={() => dispatch(decreaseQty(item))}
                    >
                      <i className='fa-solid fa-minus'></i>
                    </button>
                  </div>
                </div>

                <div className='cart-item-price'></div>
              </div>
            );
          })}
        </div>

        <div className='cart-total product'>
          <h2>Cart Summary</h2>
          <div className=' d_flex'>
            <h4>Total Price :</h4>
            <h3>${cartInfo?.total_price}.00</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
