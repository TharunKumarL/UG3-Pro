import React,{useEffect} from 'react'
import '../components/css/Booking.css'
const Booking = () => {
    useEffect(() => {
      function showImage(image) {
        image.classList.add('fade-in'); 
      }
      const serviceObserver = new IntersectionObserver((entries, serviceObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-zoom');
            serviceObserver.unobserve(entry.target); 
          }
        });
      }, { threshold: 0.1 }); 
      const servicesSection = document.querySelector('.services');
      if (servicesSection) {
        serviceObserver.observe(servicesSection);
      }
      const imageObserver = new IntersectionObserver((entries, imageObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imageId = entry.target.id;
            setTimeout(() => showImage(entry.target), parseInt(imageId.replace('image', '')) * 200); 
            imageObserver.unobserve(entry.target); 
          }
        });
      }, { threshold: 0.1 });
  
      const images = document.querySelectorAll('.tournaments, .livematches, .ContactUs, .Bookings');
      images.forEach(image => imageObserver.observe(image));
  
      return () => {
        serviceObserver.disconnect();
        imageObserver.disconnect();
      };
    }, []); 
  
    return (
      <div>
        <div className="services">
          <div className="service intro-text">
            <h1>CrickInfo</h1>    
            <p>A website for Cricket Lovers!</p>
          </div>
      
          <div className="big-service-grid"> 
            <div className="service-grid">
              <div className="tournaments" id="image1">
                <h4>01 </h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8kmWeTEzDG2rCoFYBgo5IRf-QbmHaNndqw&s" alt="Wedding Service" />
                <hr id="hr1" />
                <p>Tournamets</p>
              </div>
              <div className="livematches" id="image2">
                <h4>02 </h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv7cJYsiYGrzTW9nj9bSDdNbH5B3-N7yX63Q&s" alt="Birthday Service" />
                <hr id="hr2" />
                <p>livematches</p>
              </div>
            </div>
            <div className="service-grid">
              <div className="ContactUs" id="image4">
                <h4>04 </h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpsTAwNPbWsrAEqQNuTAzeZ_yTyvatRrPhMA&s" alt="Social Event" />
                <hr id="hr4" />
                <p>ContactUs</p>
              </div>
              <div className="Bookings" id="image3">
                <h4>03 </h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqV59XCSUkIZXS_Mo-TF0bdtQu7o9RpnM7w&s" alt="Corporate Event" />
                <hr id="hr3" />
                <p>Bookings</p>
              </div>
            </div>  
          </div> 
        </div>
      </div>
    );
  };
export default Booking
