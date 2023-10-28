import React from 'react';

type Review = {
  name: string;
  comment: string;
  rating: number;
};

type ProductProps = {
  title: string;
  details: string;
  price: number;
  sizes: string[];
  reviews: Review[];
};

const Product: React.FC<ProductProps> = ({ title, details, price, sizes, reviews }) => {
  return (
    <div className="flex flex-col items-center">
      <img src="https://source.unsplash.com/random" alt={title} className="w-full h-64 object-cover" />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600">{details}</p>
      <p className="text-lg font-bold mt-2">${price}</p>
      <div className="flex mt-4">
        {sizes.map((size, index) => (
          <span key={index} className="border border-gray-300 px-4 py-2 m-2">{size}</span>
        ))}
      </div>
      <div className="w-full mt-6">
        <h3 className="text-xl font-bold">Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="border-t border-gray-300 mt-4 pt-4">
            <p className="font-bold">{review.name} <span className="font-normal text-sm text-gray-500">rated it {review.rating}/5</span></p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;