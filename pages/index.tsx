import Image from 'next/image'
import { Inter } from 'next/font/google'
import Product from '../components/Product'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const product = {
    title: 'Example Product',
    details: 'This is an example product for demonstration purposes.',
    price: 99.99,
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [
      { name: 'John Doe', comment: 'Great product!', rating: 5 },
      { name: 'Jane Doe', comment: 'I love it!', rating: 4 },
    ],
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Product {...product} />
    </main>
  )
}