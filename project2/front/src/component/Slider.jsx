import React from 'react'

const Slider = () => {
  return (
     <section id="hero" className="hero section dark-background">

      <img src="/assets/img/hero-bg.jpg" alt=""/>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
            <h2 >Welcome to <span>Restaurantly</span></h2>
            <p >Delivering great food for more than 18 years!</p>
            <div className="d-flex mt-4" >
              <a href="#menu" className="cta-btn">Our Menu</a>
              <a href="#book-a-table" className="cta-btn">Book a Table</a>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-center mt-5 mt-lg-0">
            <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></a>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Slider