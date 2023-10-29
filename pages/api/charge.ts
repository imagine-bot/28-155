import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51O6M5FBdBgk0FUCbnORoIWxZ5W4LKLQ45kAaxbFgWBi75HA1bLuTvIksffZCj3bDNbm9vEd45Ex2pKoSlNLYtS3k004vZMYVHg', {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    } else {
      res.status(500).json({ statusCode: 500, message: 'An error occurred' });
    }
  }
}