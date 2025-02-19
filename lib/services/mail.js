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
    async sendNewMovieEmail(user, movie) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: user.mail,
                subject: 'New Movie Added!',
                html: `
                    <h1>New Movie Added!</h1>
                    <p>A new movie has been added to the database.</p>
                    <p>Title: ${movie.title}</p>
                    <p>Description: ${movie.description}</p>
                    <p>Release Date: ${movie.releaseDate}</p>
                    <p>Director: ${movie.director}</p>
                `
            });

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        } catch (error) {
            console.error('Error sending new movie email:', error);
            throw error;
        }
    }
    async sendMovieUpdatedEmail(user, movie) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: user.mail,
                subject: 'Movie Updated!',
                html: `
                    <h1>Movie Updated!</h1>
                    <p>A movie you favorited has been updated.</p>
                    <p>Title: ${movie.title}</p>
                    <p>Description: ${movie.description}</p>
                    <p>Release Date: ${movie.releaseDate}</p>
                    <p>Director: ${movie.director}</p>
                `
            });

            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        } catch (error) {
            console.error('Error sending movie updated email:', error);
            throw error;
    }
    }
};