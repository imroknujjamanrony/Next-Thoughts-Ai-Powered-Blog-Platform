'use client';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Banner() {
  const imageUrl = 'https://i.ibb.co/Z1Rzw0j/3m.jpg';

  return (
    <div className="w-screen h-screen">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="w-full h-full"
      >
        {[1, 2, 3, 4].map((num) => (
          <SwiperSlide key={num}>
            <div className="w-screen h-screen">
              <img
                src={imageUrl}
                alt={`Slide ${num}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
