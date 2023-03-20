import React from 'react';

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <i className='fa fa-phone'></i>
            <label> +84383338589</label>
            <i className='fa fa-envelope'></i>
            <label>tuandung13401@gmail.com</label>
          </div>
          <div className='right row RText'>
            <label>Theme FAQ"s</label>
            <label>Need Help?</label>
            <label>EN</label>
            <span>
              <img
                src='https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
                alt=''
                style={{ width: 20, marginRight: 3 }}
              />
            </span>
            <label>USD</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
