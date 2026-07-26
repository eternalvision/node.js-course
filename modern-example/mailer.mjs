import nodemailer from 'nodemailer';
export const createMailer = (transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
})) => ({
  sendWelcome({ to, name }) {
    return transport.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Добро пожаловать',
      text: `Здравствуйте, ${name}!`,
      html: `<p>Здравствуйте, <strong>${name}</strong>!</p>`,
    });
  },
});
