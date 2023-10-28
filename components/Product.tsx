import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

type Review = {
  name: string;
  comment: string;
  rating: number;
};

type ProductProps = {
  id: string;
};

type ProductData = {
  title: string;
  details: string;
  price: number;
  sizes: string[];
  reviews: Review[];
};

const Product: React.FC<ProductProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch(`/api/product?id=${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
      <img src="https://source.unsplash.com/random" alt={product.title} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600">{product.details}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <div className="flex mt-4">
        {product.sizes.map((size, index) => (
          <span key={index} className="border border-gray-300 px-4 py-2 m-2 rounded-full">{size}</span>
        ))}
      </div>
      <button onClick={() => setShowCheckout(true)} className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600 transition-colors duration-200">Buy Now</button>
      {showCheckout && (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <div className="w-full mt-6">
        <h3 className="text-xl font-bold">Reviews</h3>
        {product.reviews.map((review, index) => (
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