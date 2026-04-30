import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="contact section">

    
      <div className="container section-title">
        <h2>Contact</h2>
        <p>Contact Us</p>
      </div>

      <div className="mb-5" >
        <iframe style={{border:"0", width: "100%", height: "400px"}} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="container" >

        <div className="row gy-4">

          <div className="col-lg-4">
            <div className="info-item d-flex" >
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Location</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Open Hours</h3>
                <p>Monday-Saturday:<br/>11:00 AM - 2300 PM</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 5589 55488 55</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>info@example.com</p>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
           
          </div>

        </div>

      </div>

    </section>
  )
}

export default Contact