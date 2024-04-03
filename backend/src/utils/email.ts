import {createTransport} from "nodemailer";

export const sendEmail = async ({ id, email, userName, token}) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME, SMTP_FROM_EMAIL } = process.env;
    const transport:Record<string, unknown> = {
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth:{
            user: SMTP_USER,
            pass: SMTP_PASS,
        }
    }
    const transporter = createTransport(transport);
    const message:Record<string, unknown> = {
        from: `${SMTP_FROM_NAME} ${SMTP_FROM_EMAIL}`,
        to: email,
        subject: `Confirmation Email Address for ${SMTP_FROM_NAME}`,
        html:`
        <div>
            <p><span style="font-weight:bold; font-size:1.6rem">Hey, ${userName},</span>
            Thankyou for registering for an account on PMACART! Before we get started, 
            we just need to confirm that this is confirmation your email address:</p>
            <a style="background-color:#2980B9;color:White"  href= "http://localhost:8000/api/confirm-email/${id}/${token}"><b style = "font-weight:bold; font-size:1.4rem">confirm Email</b></a>
            <div>
                <p>Thank and Regards</p>
                <p>From PMACART team</p>
            </div>
        </div> `
    }
    await transporter.sendMail(message);
}