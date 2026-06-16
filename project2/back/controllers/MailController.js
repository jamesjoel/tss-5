import { BrevoClient } from '@getbrevo/brevo';
const brevo = new BrevoClient({ apiKey: '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' });

// const Transporter = NodeMailer.createTransport({
//     host : 'smtp-relay.brevo.com',
//     port : 587,
//     secure : false,
//     auth : {
//         user : '870885002@smtp-brevo.com',
//         pass : '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'
//     }
// })

let SendMail = async (req, res) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            subject: 'Hello from Brevo!',
            htmlContent: '<html><body><p>Hello,</p><p>This is my first transactional email.</p></body></html>',
            sender: { name: 'Alex from Brevo', email: 'tss759048@gmail.com' },
            to: [{ email: 'james.steppingstone@gmail.com' }],
        });
        console.log('Email sent. Message ID:', result.messageId);
    } catch (err) {
        console.log("ERROR", err)
    }
}

export { SendMail }

// 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