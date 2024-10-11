import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <div className="mx-32 md:mx[300px] mt-20">
        <PaymentElement />
      </div>
      <div className="">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
