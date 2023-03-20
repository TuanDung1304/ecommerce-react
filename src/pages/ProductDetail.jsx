import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../api/service/product';
import Spinner from '../components/Spinner/Spinner';
import './ProductDetail.css';
import { CartService } from '../api/service/cart';

export default function ProductDetail() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const { id } = useParams();

  const addToCart = async (id) => {
    setLoading(true);
    const res = await CartService.addProduct(id, 1);
    setTimeout(() => setLoading(false), 500);
    return res.data;
  };

  const getProductDetail = async () => {
    setLoading(true);
    const res = await ProductService.getProductDetail(id);
    setProduct(res.data);
    setTimeout(() => setLoading(false), 500);
  };

  useEffect(() => getProductDetail(), []);

  console.log(product);

  return (
    <div className='product-detail-container'>
      {loading && <Spinner />}
      <img
        src={product?.images.slice(7).replace('%3A', ':/')}
        alt=''
        className='product_image'
      />
      <div className='product-info'>
        <span className='product-name'>{product?.product_name}</span>
        <div className='product-price'>
          <h3>${product?.price}.00 </h3>
        </div>
        <div className='product-rate'>
          <i className='fa fa-star'></i>
          <i className='fa fa-star'></i>
          <i className='fa fa-star'></i>
          <i className='fa fa-star'></i>
          <i className='fa fa-star'></i>
        </div>
        <p className='product-desc'>{product?.description}</p>

        <div className='product-add'>
          <button
            className='product-add-btn'
            onClick={() => addToCart(product.id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
