import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <div className="mx-auto mt-20 max-w-sm sm:max-w-md lg:max-w-lg p-5">
        <PaymentElement />

        <button className="bg-blue-500 p-2 rounded-md w-full">Submit</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
