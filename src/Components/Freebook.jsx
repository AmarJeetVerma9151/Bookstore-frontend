import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Slider from "react-slick";
import Cards from './Cards';

function Freebook() {
  const [freebook, setFreebook] = useState([]);

  const getfreeAllbooks = async () => {
    try {
      const data = await axios.get("https://bookstore-backend-ru0v.onrender.com/book/freebooks");
      console.log(data.data.freebook);
      setFreebook(data.data.freebook);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getfreeAllbooks();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div className='mb-8'>
        <h1 className='font-semibold text-xl sm:text-2xl md:text-3xl pb-2'>Free Offered Courses</h1>
        <p className='text-sm sm:text-base text-gray-700 max-w-3xl'>
          📚 Explore a variety of free courses available to boost your knowledge and skills. Enroll now and start learning!
        </p>
      </div>

      <div className='-mx-2'>
        <Slider {...settings}>
          {freebook.map((item, i) => (
            <div key={i} className='px-2'>
              <Cards item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Freebook;
