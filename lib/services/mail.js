'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {
    constructor() {
        super();
        this.transporter = null;
        this.initializeTransporter();
    }

    async initializeTransporter() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendWelcomeEmail(user) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: user.mail,
                subject: 'Welcome to Our App!',
                html: `
                    <h1>Welcome ${user.firstName}!</h1>
                    <p>Thank you for creating an account with us.</p>
                    <p>Your account has been successfully created.</p>
                `
            });

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        } catch (error) {
            console.error('Error sending welcome email:', error);
            throw error;
        }
    }
};