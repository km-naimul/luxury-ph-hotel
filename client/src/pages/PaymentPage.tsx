import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe, createPaymentIntent, verifyPayment } from '../services/payment';

const PaymentForm: React.FC<{ bookingId: string; amount: number; bookingNumber: string }> = ({
  bookingId,
  amount,
  bookingNumber,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create payment intent when component mounts
    const initPayment = async () => {
      try {
        const data = await createPaymentIntent(bookingId);
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize payment');
      }
    };

    initPayment();
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      setError('Payment system not ready. Please wait...');
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Verify payment with backend
        await verifyPayment(bookingId);
        
        // Navigate to confirmation page
        navigate(`/booking-confirmation?bookingId=${bookingNumber}&paymentSuccess=true`);
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-sm border border-neutral-200">
        <label className="block text-neutral-800 font-medium mb-4">
          Card Details
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 text-sm">
          {error}
        </div>
      )}

      <div className="bg-neutral-50 p-6 rounded-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-neutral-700">Total Amount</span>
          <span className="text-2xl font-display font-bold text-primary-600">
            ${amount.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-neutral-500">
          Your card will be charged for the full booking amount.
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="btn-hover-lift w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
      >
        {isProcessing ? 'Processing Payment...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <Link
        to="/dashboard"
        className="block text-center text-neutral-600 hover:text-neutral-900 font-light text-sm"
      >
        Cancel and return to dashboard
      </Link>
    </form>
  );
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingId');
  const amount = parseFloat(searchParams.get('amount') || '0');
  const bookingNumber = searchParams.get('bookingNumber') || '';

  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    setStripePromise(getStripe());
  }, []);

  if (!bookingId || !amount) {
    return (
      <div className="pt-24 min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">Invalid payment information</p>
          <Link
            to="/dashboard"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            Booking #{bookingNumber}
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-lg">
          {stripePromise && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                bookingId={bookingId}
                amount={amount}
                bookingNumber={bookingNumber}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
