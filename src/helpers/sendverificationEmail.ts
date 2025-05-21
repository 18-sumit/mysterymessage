import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
// import { use } from "react";
// import emailjs from "@emailjs/browser"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {
        await resend.emails.send({
            from: 'obnboarding@resend.dev',
            to: email,
            subject: 'MysteryMessage | Verification code ',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return {
            success: true,
            message: "Verification email sent successfully"
        }

    } catch (Emailerror) {
        console.log("Error sending verification email", Emailerror);
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}

