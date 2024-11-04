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
  //   console.log('BODY : ', body.products);
  return (
    <div>
      <h1>
        Welcome,{body.username} {/*body.username.firstName*/}!
      </h1>
      {/* <h2>Body: {body}</h2> */}
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
            <p>Slug: {product.slug}</p>
            <p>Files: {product.files}</p>
            <p>Content: {product.content}</p>
            <p>Delivery: {product.delivery}</p>
           */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';

// export const EmailTemplate = ({
//   firstName,
//   loginDate,
//   loginDevice,
//   loginLocation,
//   loginIp,
// }: YelpRecentLoginEmailProps) => {
//   const formattedDate = new Intl.DateTimeFormat('en', {
//     dateStyle: 'long',
//     timeStyle: 'short',
//   }).format(loginDate);

//   return (
//     <Html>
//       <Head />
//       <Preview>Yelp recent login</Preview>
//       <Body style={main}>
//         <Container>
//           <Section style={logo}>
//             <Img src={`${baseUrl}/static/yelp-logo.png`} />
//           </Section>

//           <Section style={content}>
//             <Row>
//               <Img
//                 style={image}
//                 width={620}
//                 src={`${baseUrl}/static/yelp-header.png`}
//               />
//             </Row>

//             <Row style={{ ...boxInfos, paddingBottom: '0' }}>
//               <Column>
//                 <Heading
//                   style={{
//                     fontSize: 32,
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                   }}
//                 >
//                   Hi {firstName},
//                 </Heading>
//                 <Heading
//                   as="h2"
//                   style={{
//                     fontSize: 26,
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                   }}
//                 >
//                   We noticed a recent login to your Yelp account.
//                 </Heading>

//                 <Text style={paragraph}>
//                   <b>Time: </b>
//                   {formattedDate}
//                 </Text>
//                 <Text style={{ ...paragraph, marginTop: -5 }}>
//                   <b>Device: </b>
//                   {loginDevice}
//                 </Text>
//                 <Text style={{ ...paragraph, marginTop: -5 }}>
//                   <b>Location: </b>
//                   {loginLocation}
//                 </Text>
//                 <Text
//                   style={{
//                     color: 'rgb(0,0,0, 0.5)',
//                     fontSize: 14,
//                     marginTop: -5,
//                   }}
//                 >
//                   *Approximate geographic location based on IP address:
//                   {loginIp}
//                 </Text>

//                 <Text style={paragraph}>
//                   If this was you, there&apos;s nothing else you need to do.
//                 </Text>
//                 <Text style={{ ...paragraph, marginTop: -5 }}>
//                   If this wasn&apos;t you or if you have additional questions,
//                   please see our support page.
//                 </Text>
//               </Column>
//             </Row>
//             <Row style={{ ...boxInfos, paddingTop: '0' }}>
//               <Column style={containerButton} colSpan={2}>
//                 <Button style={button}>Learn More</Button>
//               </Column>
//             </Row>
//           </Section>

//           <Section style={containerImageFooter}>
//             <Img
//               style={image}
//               width={620}
//               src={`${baseUrl}/static/yelp-footer.png`}
//             />
//           </Section>

//           <Text
//             style={{
//               textAlign: 'center',
//               fontSize: 12,
//               color: 'rgb(0,0,0, 0.7)',
//             }}
//           >
//             © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
//             U.S.A. | www.yelp.com
//           </Text>
//         </Container>
//       </Body>
//     </Html>
//   );
// };

// EmailTemplate.PreviewProps = {
//   userFirstName: 'Alan',
//   loginDate: new Date('September 7, 2022, 10:58 am'),
//   loginDevice: 'Chrome on Mac OS X',
//   loginLocation: 'Upland, California, United States',
//   loginIp: '47.149.53.167',
// } as YelpRecentLoginEmailProps;

// export default EmailTemplate;

// const main = {
//   backgroundColor: '#fff',
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const paragraph = {
//   fontSize: 16,
// };

// const logo = {
//   padding: '30px 20px',
// };

// const containerButton = {
//   display: 'flex',
//   justifyContent: 'center',
//   width: '100%',
// };

// const button = {
//   backgroundColor: '#e00707',
//   borderRadius: 3,
//   color: '#FFF',
//   fontWeight: 'bold',
//   border: '1px solid rgb(0,0,0, 0.1)',
//   cursor: 'pointer',
//   padding: '12px 30px',
// };

// const content = {
//   border: '1px solid rgb(0,0,0, 0.1)',
//   borderRadius: '3px',
//   overflow: 'hidden',
// };

// const image = {
//   maxWidth: '100%',
// };

// const boxInfos = {
//   padding: '20px',
// };

// const containerImageFooter = {
//   padding: '45px 0 0 0',
// };

// BODY :  {
//     amount: 1999,
//     email: 'mariamisaeva10101@gmail.com',
//     username: {
//       pathRoot: '/me',
//       id: 'user_2mnvrkVBMfz6VvyRxvVuLCQAdW9',
//       externalId: null,
//       username: null,
//       emailAddresses: [ [Object] ],
//       phoneNumbers: [],
//       web3Wallets: [],
//       externalAccounts: [ [Object] ],
//       passkeys: [],
//       samlAccounts: [],
//       organizationMemberships: [],
//       passwordEnabled: false,
//       firstName: 'MariamIsaeva',
//       lastName: null,
//       fullName: 'MariamIsaeva',
//       primaryEmailAddressId: 'idn_2mnvrdOQE8ag4q3rqDpoxDzN0Eb',
//       primaryEmailAddress: {
//         pathRoot: '/me/email_addresses',
//         emailAddress: 'mariamisaeva10101@gmail.com',
//         linkedTo: [Array],
//         id: 'idn_2mnvrdOQE8ag4q3rqDpoxDzN0Eb',
//         verification: [Object]
//       },
//       primaryPhoneNumberId: null,
//       primaryPhoneNumber: null,
//       primaryWeb3WalletId: null,
//       primaryWeb3Wallet: null,
//       imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybW52cms2d1BPVGF0WTZMQndjS1h6WDZTVkgifQ',
//       hasImage: true,
//       twoFactorEnabled: false,
//       totpEnabled: false,
//       backupCodeEnabled: false,
//       publicMetadata: {},
//       unsafeMetadata: {},
//       createOrganizationEnabled: true,
//       deleteSelfEnabled: true,
//       lastSignInAt: '2024-10-21T17:57:08.384Z',
//       updatedAt: '2024-10-21T17:57:08.479Z',
//       createdAt: '2024-09-30T19:42:35.821Z',
//       cachedSessionsWithActivities: null
//     }
//   }
