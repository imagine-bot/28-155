import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: string;
  title: string;
  details: string;
  price: number;
  sizes: string[];
  reviews: {
    name: string;
    comment: string;
    rating: number;
  }[];
};

type ErrorResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | ErrorResponse>
) {
  const { id } = req.query;

  // Sample data
  const product: Product = {
    id: '1',
    title: 'Example Product',
    details: 'This is an example product for demonstration purposes.',
    price: 99.99,
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [
      { name: 'John Doe', comment: 'Great product!', rating: 5 },
      { name: 'Jane Doe', comment: 'I love it!', rating: 4 },
    ],
  };

  if (product.id === id) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}