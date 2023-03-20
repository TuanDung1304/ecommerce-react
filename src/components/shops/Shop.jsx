import React, { useEffect, useState } from 'react';
import { ProductService } from '../../api/service/product';
import Catg from './Catg';
import ShopCart from './ShopCart';
import './style.css';

const Shop = () => {
  const [category, setCategory] = useState(0);
  const [shopItems, setShopItems] = useState([]);

  const getProducts = async () => {
    const res = await ProductService.getProducts(category);
    setShopItems(
      res.data.map((item) => ({
        ...item,
        images: item.images.slice(7).replace('%3A', ':/'),
      }))
    );
  };

  const categories = ['Tablets', 'Mobile Phones', 'Watches'];

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Catg setCategory={setCategory} />

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>{categories[category]}</h2>
              </div>
              <div className='heading-right row '>
                <span>View all</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <ShopCart shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
