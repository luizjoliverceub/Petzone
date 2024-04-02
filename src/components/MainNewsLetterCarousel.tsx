"use client"

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';


type NewsData = {
  imgUrl: string;
  webSite: string;
  title: string;
  description: string;
}[];

export default function MainNewsLetterCarousel({ newsData }: { newsData: NewsData }) {
  const [emblaRef] = useEmblaCarousel()

  return  (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {newsData.map((news, index) => (
          <div key={index} className="embla__slide relative z-10">
            <img src={news.imgUrl} alt={news.title} className="w-full h-full brightness-75" />
            <div className="slide-content">
              <div className="text-center mx-4">
                <h2 className="text-xl font-semibold text-white mb-2">{news.title}</h2>
                <p className="text-sm font-thin text-white">{news.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}