import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/mac.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Mac</h3>
          <p>Laptop Mac.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/tablet.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Tablet</h3>
          <p>Tablet actualizada</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/phone.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Smartphone</h3>
          <p>
            Smartphone.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
