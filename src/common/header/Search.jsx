import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartService } from '../../api/service/cart';
import logo from '../../components/assets/images/logo.svg';

const Search = () => {
  const [cartInfo, setCartInfo] = useState();

  const getCartInfo = async () => {
    const res = await CartService.getCartItems();
    console.log('cartInfo: ', res.data);
    setCartInfo(res.data);
  };

  useEffect(() => {
    getCartInfo();
  }, []);

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <Link to='/'>
              <img src={logo} alt='' />
            </Link>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{cartInfo?.total_item || 0}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
