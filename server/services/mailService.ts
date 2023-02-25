import nodemailer from 'nodemailer';

class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST!,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_AUTH_USER!,
                pass: process.env.SMTP_AUTH_PASS!
            }
        });
    }
    async sendActivationEmail(to: string, link: string) {
        // TODO: import HTML-template
        await this.transporter.sendMail({
            from: process.env.SMTP_SENDER_EMAIL,
            to,
            subject: 'Activate you account ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Click on the link to activate your account</h1>
                    <a target="_blank" href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService();