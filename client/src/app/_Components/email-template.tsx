import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface Product {
  title: string;
  price: number;
  downloadUrl: string[];
  // description:string;
  // category:string;
  // image:string;
  // id:string;
  // files:string[];
  // content:string;
}

interface EmailTemplateProps {
  body: {
    username: string;
    // email: string;
    amount: number;
    products: Product[];
    // message: string;
  };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  body,
}) => {
  return (
    <div>
      <h1>
        Welcome,{body.username} {/*body.username.firstName*/}!
      </h1>
      <h2>Amount: ${body.amount}</h2>

      <ul>
        {body.products.map((product) => (
          <li key={product.title}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Download Url: </p>
            <p>{product.downloadUrl}</p>
            {/* <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Image: {product.image}</p>
            <p>Id: {product.id}</p>
            <p>Files: {product.files}</p>
            <p>Content: {product.content}</p>
           */}
          </li>
        ))}
      </ul>
    </div>
  );
};
