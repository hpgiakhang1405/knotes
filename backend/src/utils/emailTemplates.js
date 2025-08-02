export const verificationEmailTemplate = (name, otp) => {
  return `<div style="max-width:440px;margin:0 auto;padding:40px;background:#fff;border-radius:12px;box-shadow:0 6px 32px rgba(0,0,0,0.12);font-family:'Segoe UI',Roboto,Arial,sans-serif;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
                <span style="font-size:1.45rem;font-weight:700;color:#222;">KNotes</span>
            </div>
            <h2 style="font-size:1.2rem;font-weight:600;margin-bottom:8px;color:#222;">Verify Your Email Address</h2>
            <p style="font-size:1.05rem;color:#333;line-height:1.7;margin-bottom:20px;">
                Hello <b>${name}</b>,<br>
                Thank you for signing up with <b>KNotes</b>.<br>
                Use the code below to verify your email address:
            </p>
            <div style="text-align:center;margin:28px 0 22px 0;">
                <span style="display:inline-block;background:#f6f8fa;color:#1a2137;font-size:2.1rem;font-weight:700;letter-spacing:10px;padding:18px 36px;border-radius:14px;box-shadow:0 2px 12px rgba(40,40,80,0.05);">
                    ${otp}
                </span>
            </div>
            <p style="font-size:1rem;color:#3b3b3b;line-height:1.6;margin-bottom:10px;text-align:center;">
                This code will expire in <b>5 minutes</b>.<br>
                Please do not share it with anyone for security reasons.
            </p>
            <div style="border-top:1px solid #ececec;margin:32px 0 18px 0;"></div>
            <p style="font-size:0.96rem;color:#888;margin:0;">
                If you did not request this, you can safely ignore this email.<br><br>
                Best regards,<br>
                The KNotes Team<br>
            </p>
        </div>`
}

export const resetPasswordEmailTemplate = (name, resetLink) => {
  return `<div style="max-width:440px;margin:0 auto;padding:40px;background:#fff;border-radius:12px;box-shadow:0 6px 32px rgba(0,0,0,0.12);font-family:'Segoe UI',Roboto,Arial,sans-serif;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
                <span style="font-size:1.45rem;font-weight:700;color:#222;">KNotes</span>
            </div>
            <h2 style="font-size:1.2rem;font-weight:600;margin-bottom:8px;color:#222;">Reset Your Password</h2>
            <p style="font-size:1.05rem;color:#333;line-height:1.7;margin-bottom:20px;">
                Hello <b>${name}</b>,<br>
                We received a request to reset your password for your <b>KNotes</b> account.<br>
                Click the button below to choose a new password:
            </p>
            <div style="text-align:center;margin:28px 0 22px 0;">
                <a href="${resetLink}" target="_blank" style="background:#1a2137;color:#fff;font-size:1.05rem;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:10px;display:inline-block;box-shadow:0 2px 12px rgba(40,40,80,0.1);">
                    Reset Password
                </a>
            </div>
            <p style="font-size:1rem;color:#3b3b3b;line-height:1.6;margin-bottom:10px;text-align:center;">
                This link will expire in <b>10 minutes</b>.<br>
                Please do not share it with anyone for security reasons.
            </p>
            <div style="border-top:1px solid #ececec;margin:32px 0 18px 0;"></div>
            <p style="font-size:0.96rem;color:#888;margin:0;">
                If you did not request this, you can safely ignore this email.<br><br>
                Best regards,<br>
                The KNotes Team<br>
            </p>
        </div>`
}
