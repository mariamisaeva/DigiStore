import { EmailTemplate } from '../../_Components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', //Add your domain if  you have
      to: [email],
      subject: 'Hello world',
      react: EmailTemplate({ body }),
    });

    console.log('data(route.ts): ', data);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
