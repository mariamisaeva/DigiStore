# Starting building the project

## FRONTEND

### 1. Creating the files structure

1. Install NextJS in the frontend dir:
   `npx create-next-app .`

**NOTES**:

- `app` directory has the all routes we use.
- `page.tsx` is the home/main page.
- `layout.tsx` is the used stuff that have to be fixed in all pages.

  2.Create `_Components` directory.

**NOTE**:

- `_filename` is creating a private folder not included in the routes.
- Install es7 react/redux and tailwind css for easier autocomplete.
  `npm install @types/react-redux @types/tailwindcss`

  3.Create our components Header,Footer and Hero/content.

  4.In the `layout` add the fixed components wrapped around {children}.

### 2. Creating the Header component

1. Use `HyperUI` library to create the header by copying and pasting JSX of the header you like.

**NOTE**: It doesn't need any special installation.
[HyperUI](https://www.hyperui.dev/)

2. Change logo [Logoipsum](https://logoipsum.com/), and create a file.svg in public and paste the code of the logo.

3. Add the logo to the header: will imprt `<Image />` from 'next/image' .. and Instead of `<a>` will write `<Image src='/... ' alt=' ' width={ } height ={ }  />`.

4. Change colors : [colorPalettes](https://colorhunt.co/).
   Open the tailwind configuration and add colors to include your main colors.. instead of doing this manually.

   **NOTE**: It makes it super easy when you need to change the colors of the website for any reason.

### 3. Creating the Hero section

1. Go to banners in HyperUI and choose one and paste it in the Hero section component.
2. Add the component to the page`<Hero />`.

**NOTE**:

- if you wanna make it a little up remove: `lg:items-center`.

## BACKEND

### Installing Strapi (CMS)

1. Go to 'server' directory and install `Strapi` (Content Management System) :
   `npx create-strapi-app@latest .`

**NOTE**: You might need to use an older version of Node (I needed in my case Node 20, and I had 21)... so in this case you need to install NVM and the older Node and set it up as default:

1.Install NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash` in Terminal. 2. Load NVM into the Terminal Session: `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
`.
Then=> `echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
`.
Then=> `source ~/.zshrc`. 3. Install an older Node version: `nvm install 20`. 4. If you wanna set it as default: `nvm alias default 20`. 5. If you need to change the version: Step(3) then Step(4) for all new terminal sessions.. If you wanna switch in the current terminal session: `nvm use 20.x.x`. 6. If NVM is not loaded in VSCODE terminal: ZSH: `export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"` .. BASH:`export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`.

### Using Cloudinary to upload assets instead of the server (Locally on Strapi)

1. Go to MarketPlace in Strapi and search for `Cloudinary` Plugin.
2. Follow the instructures to install it: `npm install @strapi/provider-upload-cloudinary`

3. Go to `config` direcory in server and create `plugins.js` and paste the following config in:

```c
module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
                upload: {},
                delete: {},
            },
        },
    },
});

```

Then go to `middleware.js` and replace the following configuration in place of `'strapi::security',`:

```c
{
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': ["'self'", 'data:', 'blob:','market-assets.strapi.io', 'res.cloudinary.com'],
        'media-src': ["'self'", 'data:', 'blob:','market-assets.strapi.io', 'res.cloudinary.com'],
        upgradeInsecureRequests: null,
      },
    },
  },
},
```

follow this article for step by step guide: [Adding Cloudinary Support to Strapi](https://medium.com/@risinipiyathma1998/upload-plugin-configuration-to-store-media-in-cloudinary-folder-wise-in-strapi-v4-e0d494f10c9c)

### Fetch api data

Add some collections and some data.

- You can get your products from:[http://localhost:1337/api/products](http://localhost:1337/api/products)
  and you can get all attributes like image, price, files and so on from:  
  [http://localhost:1337/api/products?populate=\*](http://localhost:1337/api/products?populate=*)

- For any more info/help [Strapi-docs](https://docs.strapi.io/dev-docs/api/rest).

#### Create an API token on Strapi

1. Go to settings >> api token >> create token >> enter projectName/ duration: unlimated/ custom -- available for Product: find + fineOne (So anyyone has this token can reach use them only)
2. Copy token to .env.local in the `CLIENT`
   and store it in : `NEXT_PUBLIC_REST_API_KEY =yourToken`

#### Install Axios to fetch the data

`npm install axios`

### Create the product section annd list

- Call ProductSection under Hero section in home page, and the productList in the ProductSection component.

### Create `_utils` directory in app folder

setup axios to fetch data:

```c
import axios, { AxiosInstance } from 'axios';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;

const apiURL = 'http//:localhost:1337/api';

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default axiosClient;
```

- create another file in `_utils` :`productsAPI`:

create in there a route to fetch data from the backend(getLatestProducts)

- Go to the productSection:
  create a func with the same name with _to differ between it and the api (getLatestProducts_) or simply use another name.

- When we output `res.data` we get data{} , meta{} ... so we need to render the products themselves so: `res.data.data`.

Initialize a state for productList and set it instead of console.log.

## Products List Component (Product cards)

- Pass productList as a prop to ProductListComponent.

- then go to `ProductList` component - distructure it in props - map over it and return a div with another component for `ProductCard`.
- Create a new component `ProductCard` and pass the product as a prop to it and return a div `<div key={product.id}>{product?.attributes.title}</div>`.

**NOTE**: In data returned data there is no image(banner), to get it, go to ProductAPI and add `?populate=*`

```c
 return axiosClient.get('/products?populate=*');
```

Then go to `ProductCard`

- Then import Image from next/image and

```c
  <Image
        src={product.attributes.image.data.attributes.url}
        alt="img"
        width={400}
        height={400}
      />
```

**NOTE**: Because the images are stored on Cloudinary, external domain...
Error: Invalid src prop (<https://res.cloudinary.com/dm4vls99s/image/upload/v1724851417/Dot_MX_341_Resumen_semanal_de_noticias_fac889a919.jpg>) on `next/image`, hostname "res.cloudinary.com" is not configured under images in your `next.config.js`
See more info: <https://nextjs.org/docs/messages/next-image-unconfigured-host>

```c
//to solve this ERROR go to next config - and add the trust domain as the following

const nextConfig = {
    images:{
 domains: ['res.cloudinary.com']
}};
```

- Will wrap the div of the title and category inside another div and add h2 for the price (to make the price on the right and the other stuff on the left)

## Create route for Product Details Page

Create in `app` directory `product-details` then inside this another directory `[productId]` then page.tsx

**NOTE**: if you change page/tsx to another name it won't work!

- Go to productsAPI to create another route /products/id

### Create DetailsPage component

```c
//pass {params} annd render the id [params?.productId]

useEffect(() => {
    async function fetchProductById() {
      try {
        const res = await getProductById(params?.productId);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProductById();
  }, [params?.productId]);

```

## Create a breadCrumbs (small navbar from HyperUI)

create a component for it i \_components folder.

**NOT**: DetailsPage:

```c
/*add marginTop flex(bigScreen) flex-col(smallScreen) justify around for space arounnd them -- change it to grid better, coz when the description is longer the style is getting destroyed*/
```

## Add similar product from the same category

- create another API route for similar products..
  from Strapi docs you see the similar part

```c
users?filters[username][$eq]=John
```

```c
const getProductbyCategory = (category: string) => {
  return axiosClient.get(
    `products?filters[category][$eq]=${category}?populate=*`,
  );
};
```

The go to DetailsPage and add a function to render the category products

```c
//Create a state for similar products
const [similarProductList, setSimilarProductList] = useState<
    Product[] | null
  >(null);

//useEffect to call the func
  useEffect(() => {
    if (productDetails) {
      fetchProductByCategory(productDetails);
    }
  }, [productDetails]);

//The func fetching data
async function fetchProductByCategory(product: Product) {
    try {
      const res: AxiosResponse<StrapiResponse<Product[]>> =
        await getProductByCategory(product?.attributes?.category);

      setSimilarProductList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  }

//Render ProductList comp. to get the product cards into similar product with passing a prop : productList={similarProductList}
  return(
 <div>
        <h2>
          Similar Products
        </h2>
        <ProductList productList={similarProductList || []} />
      </div>
  );
```

### Add link

Add Link to ProductCard comp. so when you cliick on a card it nnavigates to product-details page of this this card.

```c
 <Link
      href={`/product-details/${product?.id}`} ...
```

### Add The Path to BreadCrumbs (smallavbar)

```c
//1. Import and Add to DetailsPage usePathname() from next navigation
import { usePathname } from 'next/navigation';

  const path = usePathname();
//if you console.log(path) /products-details/3
//if you '/products-details/3'.split('/') >>> ['',product-details, 3]
//so we want the last 2 in the smallNavbar (breadCrumbs)


//2. Pass the path into smallNavbar render
      <SmallNavbar path={path} />

//3. Go to smallnavbar and add the following instead of Shirts
  {path?.split('/')[1]}

//and this istead of Plain tree
 {path?.split('/')[2]}

//Then replace Link innnstead of a
```

### Add skeleton loading effect - shadow of an element

```c
//Go to ProductImage
//Add a div with a class of skeleton

```

## Auth With Clark

- Follow the docs to implement it (that's very clear)

- Add sign in and sign up to Route grouping `(auth)>> signup>>.... , signin>>`: it doesn't affect the routing generally but I can collect in there the routes of the authentication (organized better).

- then update the environment variables.

### Add public routes

If you go to the localhost:3000 it will redirect you to signup/in page, but we wanna keep it public, ONLY when I click on Add to cart and such stuff.

- Go to middleware and add to the func

## Working On Cart

Before adding cart I need to add it to the backend of `Strapi`.

- Go to Strapi and add a new collection type called cart.

This cart are gonna have 3 things: UserName, Email , and the product (I don't need the wholel product- so I need to make a relationship between the product and this collection).

- In cart collection you can see Relation, add one(cart) to many(product).. Then save.

### Implementing the cart in the frontend

- Go to the documentation [Create a Document/entry](https://docs.strapi.io/dev-docs/api/rest#create).

- Go to \_utils to create the API to create entries into the cart.. And create a new route:

```c
const addToCart = (data: any) => axiosClient.post('/carts', data);
```

- Go to the piece of code in ProductInfo.tsx button and add the logic of addToCart (call the API):

```c
     const bodyData = {
        data: {
          username: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
          product: [product?.id],
        },
      };

      //   console.log('data in handleAddToCart: ', data);
      try {
        const res = await addToCart(bodyData);
        console.log('Response: ', res);
      } catch (err) {
        console.log('Error adding to cart: ', err);
      }
```

Then we are gonna get an `ERROR` with carts in Network..
(Because the token (in Headers>Authorization) doesn't have a permission to to grab the product and find one Or can add to cart. NO!)

So we have to go (After creating cart collection) to : Strapi dashoard -> settings -> API token -> The we have 2 options:

1. To create a new token with these permissions.
2. To add the permission to the existing token (edit the exisiting token).

Will go with option 2:
Edit existing token -> Go to Permission section -> Cart -> select all -> Save.

## Increasing the number on the cart icon

Use `ContextAPI`:

1. Create `_context` folder and create `cartContext.tsx`.

```c
import { createContext } from 'react';

type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

```

then go to `layout.tsx`:

```c
import { CartProvider } from './_context/cartContext';


    return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <CartProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
```

Then Go to `Header.tsx`: and destruct cart and setCart:

the number in th header next to cart icon is `cart.length`

```c
import { useCart } from '../../../_context/cartContext';


  const { cart, setCart } = useCart();

 {cart?.length} //instead of (0) in h2 next to icon
```

Then go to `productInfo.tsx`:

(When I log the Response I get from the API call: I get the id of the cart and the other data but I don't get the product - But I have the product passed as a prop)

### Solving resetting the number on Refresh

Problem: When the number next to cart increasing, it get resat when we refresh the page.

Solution:
To bring the cart in the API call from the backend(DB).. So on refresh I will be fetching the data from bk and bring it back as it is.

As we see that the `/api/carts`, returns the objects without the products because it's a relationship, so when we populate the product it shows the product without the banner, so we need to populate the product, banner, and filter by email.

1. Create a new route to bring/populate the cart from the backend.

```c
const getCartPerUser = (
  email: string,
): Promise<AxiosResponse<StrapiResponse<cartPayload>>> => {
  return axiosClient.get(
    `/carts?populate[products][populate]=image&filters[email][$eq]=${email}`,
  );
};
```

2.Go to `Header.tsx` to create a new API call to bring/populate the cart from the backend.. and add useEffect to call the func, on the authenticated user change(when the user changes the cart changes according to the user).

```c
//Header.tsx
function Header() {
 //...other code...
  const fetchUserCart = async (email: string) => {
    try {
      const res = await getCartPerUser(email);
      console.log('Cart Response: ', res?.data?.data); //AN ARRAY
      res?.data?.data.forEach((item: CartItem) => {
        setCart((prevCart) => [
          ...prevCart,
          {
            id: item?.id,
            product: item?.attributes?.products?.data[0],
          },
        ]);
      });
    } catch (err) {
      console.error('ERROR: ', err);
    }
  };

//.....other code .....

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress || '';
    user && fetchUserCart(email);
  }, [user]);

return (/*The rest ....*/)
};
```

## Cart component

- Create Cart component, and add styling to it

```c
return(
    <div
      className="h-[300px] w-[250px] bg-gray-200 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto"
      style={{ color: 'black' }}
    >
)
```

- Then go to HyperUI and pick a cart element and paste it below that.

- Bring the data dynamically:
  By destructuring cart and setCart from the context.

```c
 const { cart, setCart } = useCart();
```

- then will map on the elements:

```c
  return (
    <div
      className="h-[300px] w-[250px] bg-gray-200 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto"
      style={{ color: 'black' }}
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item?.id} className="flex items-center gap-4">
              {console.log(item)}
              <Image
                src={item?.product?.attributes?.image?.data?.attributes?.url}
                alt="Product Image"
                width={80}
                height={80}
                className="size-16 rounded object-cover"
              />
              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {/* one line */}
                  {item?.product?.attributes?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Price: $</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
  );
  };
```

- We wanna make the cart appear and disappear on click of cart icon:
  Go to `Header.tsx`:

  ```c
  //Header.tsx

  //create state:
  const [toggleCart, setToggleCart] = useState(false);

  //Go to cartIcon -- add onClick if not active - if cart is opened show it
      <RiShoppingCartLine
                      onClick={() => setToggleCart(!toggleCart)}
                      color="black"
                      style={{
                        padding: 0,
                        fontSize: '22px',
                      }}
                    />
                    {cart?.length}
                  </h2>
                  <UserButton />
                  {toggleCart && <Cart />}
                </div>
              )}
  ```

## Cart Page

1. Create a new folder in `app` with the route name `cart` then a file 'page.tsx' "localhost:3000/cart".

2. Create a component in `cart/page.tsx`.

3. Go to cart component in `_components` and add a reference to this route

```c
<div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({cart?.length})
          </Link>
```

## Stripe integration

1. Create a new folder (Route) `checkout`, within this create a file `page.tsx` and another folder `_components`.

2. inside `_components` create a file `CeckoutForm.tsx`.

3. In `CheckoutForm.tsx` add the related codefrom documentation.

[StripeDocs](https://docs.stripe.com/stripe-js/react#before-you-begin)

4.Create a new folder in `app` calls `api` then create a folder `create-intent` then create a file `route.tsx` within this.

5.In `api/route.tsx` add the code for the API endpoint to handle the
stripe payment.

and add the following code :

```c
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { amount } = data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: 'USD',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

```

6.Go to `CheckoutForm.tsx` and fetch POST from the create-intent api .. add client secret before elements.

```c

    const res = await fetch('api/create-intent', {
      method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      body: JSON.stringify({
        amount: 10,
      }),
    });


    const clientSecret: any = await res.json;

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

```

7.Fixed a lot of errors and different stuff related to CheckoutForm, checkout component, route (Check the related code).

### Remove elements from the cart and cart_dropdown, and Follow the order

- Need to add the order on Strapi:

1. create a new collection on Strapi `order`, it will have an `email:email`,`username:text`,`amount:number-float`, `relation: orders-projects many-to-many` then save...

2. Go to settings>> tokens>> allow everything in orders>>save.

- Create an API for Order

1. Go to `utils` and create `orderAPI.tsx`

```c
import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface OrderPayload {
  data: {
    username: string;
    email: string;
    products: string[];
  };
}

const createOrder = (
  data: OrderPayload,
): Promise<AxiosResponse<StrapiResponse<OrderPayload>>> =>
  axiosClient.post('/orders', data);

export { createOrder };

```

2.Then will go to `Checkout Form.tsx` ... Destructure cart and setCart >> and destructure user from useUser().

3.Before Return will create a func `fetchCreateOrder` to cal the API >>

```c
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
}: {
  amount: number;
}) => {
  const { cart, setCart } = useCart(); //////
  const { user } = useUser(); //clerk/nextjs
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const handleError = (error: any) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    if (!stripe || !elements) {
      return;
    }

    fetchCreateOrder(); //call the func

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch('/api/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });

    if (!res.ok) {
      console.error('Failed to create payment intent:', res.statusText);
      return;
    }

    const { client_secret: clientSecret } = await res.json();

    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment-success',
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

//and here is the function
  const fetchCreateOrder = async () => {
    const ProductIds: any = [];
    cart.forEach((item) => ProductIds.push(item?.product?.id));

    const email = user?.primaryEmailAddress?.emailAddress || '';

    const payload = {
      data: {
        username: user?.fullName || '',
        email,
        amount,
        products: ProductIds,
      },
    };

    try {
      const res = await createOrder(payload);

      if (res) {
        cart.forEach((item) => {
          deleteCartItem(item?.id).then((result) => {});
        });
      }
      console.log(`res: `, res);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };
 //......
```

## Send email with the product

1. Register on Resend, and create an API_KEY and follow the docs
   [Resend Documentation](https://resend.com/docs/send-with-nextjs)

> > Create a file `email-template.tsx` in `_components` and paste the related code from the docs.

2.Use the app directory as in docs

3.Go to CheckoutForm and create a call for the api like with create-intent

```c

  const send_email = async () => {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
```

4.Go to react email (nice website that provides some email templates instead of wasting time making it)
[Docs(ReactEmail)](https://react.email/docs/introduction)

Install dependencies in docs >>
Include email template
