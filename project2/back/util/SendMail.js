import { BrevoClient } from '@getbrevo/brevo';
const brevo = new BrevoClient({ apiKey: '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' });

let SendMail = async (to, sub, body) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: sub,
            htmlContent: body,
            sender: { name: 'Alex from Brevo', email: 'tss759048@gmail.com' },
            to: [{ email: to }],
        });
        console.log('Email sent. Message ID:', result.messageId);
    } catch (err) {
        console.log("ERROR", err)
    }
}

export default SendMail

// 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