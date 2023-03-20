import React from 'react';

const Catg = ({ setCategory }) => {
  const data = [
    {
      cateImg: './images/category/cat-2.png',
      cateName: 'Tablets',
    },
    {
      cateImg: './images/category/cat-1.png',
      cateName: 'Phones',
    },
    {
      cateImg: './images/category/cat-3.png',
      cateName: 'Watches',
    },
  ];

  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Categories </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div
              className='box f_flex'
              key={index}
              onClick={() => setCategory(index)}
            >
              <img
                src={value.cateImg}
                alt=''
                style={{ width: '20px', margin: 0 }}
              />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Catg;
