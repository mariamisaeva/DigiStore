import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <div className="mx-32 md:mx[300px] mt-20">
        <PaymentElement />

        <button className="bg-blue-500 p-2 rounded-md w-full">Submit</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
