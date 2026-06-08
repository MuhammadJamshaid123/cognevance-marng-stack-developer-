import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderAPI, paymentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function CheckoutForm({ order, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      await paymentAPI.confirm(order._id, paymentIntent.id);
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      {error && <div className="alert alert-error">{error}</div>}
      <button className="btn btn-primary btn-lg" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${order.totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '', country: '' });
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState('address');

  if (!user) {
    navigate('/login');
    return null;
  }

  const createOrder = async (e) => {
    e.preventDefault();
    const res = await orderAPI.create({ shippingAddress: address });
    if (res.success) {
      setOrder(res.data);
      const payRes = await paymentAPI.createIntent(res.data._id);
      if (payRes.success) {
        setClientSecret(payRes.data.clientSecret);
        setStep('payment');
      }
    }
  };

  return (
    <section className="page-section">
      <div className="container narrow">
        <h1>Checkout</h1>
        {step === 'address' ? (
          <form className="checkout-form" onSubmit={createOrder}>
            <h2>Shipping Address</h2>
            {['street', 'city', 'state', 'zip', 'country'].map((field) => (
              <label key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <input value={address[field]} onChange={(e) => setAddress({ ...address, [field]: e.target.value })} required />
              </label>
            ))}
            <button type="submit" className="btn btn-primary">Continue to Payment</button>
          </form>
        ) : (
          clientSecret && order && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm order={order} onSuccess={() => navigate('/orders')} />
            </Elements>
          )
        )}
      </div>
    </section>
  );
}
