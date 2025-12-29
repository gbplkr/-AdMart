<?php
// Email configuration using PHPMailer or native mail()

// PHPMailer configuration (recommended)
// require 'vendor/autoload.php';
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
// use PHPMailer\PHPMailer\Exception;

function sendResetEmail($toEmail, $resetLink) {
    // Configure your SMTP settings
    $smtpHost = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpUsername = getenv('SMTP_USERNAME') ?: '';
    $smtpPassword = getenv('SMTP_PASSWORD') ?: '';
    $smtpPort = getenv('SMTP_PORT') ?: 587;
    $fromEmail = getenv('MAIL_FROM') ?: 'noreply@example.com';
    $fromName = getenv('MAIL_FROM_NAME') ?: 'Your App';

    $subject = "Password Reset Request";
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #2563eb; 
                color: white !important; 
                text-decoration: none; 
                border-radius: 6px;
                margin: 20px 0;
            }
            .footer { color: #666; font-size: 12px; margin-top: 30px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Password Reset Request</h2>
            <p>You requested a password reset for your account.</p>
            <p>Click the button below to reset your password:</p>
            <a href='$resetLink' class='button'>Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href='$resetLink'>$resetLink</a></p>
            <p>This link will expire in 1 hour.</p>
            <p class='footer'>If you didn't request this, you can safely ignore this email.</p>
        </div>
    </body>
    </html>
    ";

    // Using native mail() function
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $fromName <$fromEmail>\r\n";
    $headers .= "Reply-To: $fromEmail\r\n";

    return mail($toEmail, $subject, $message, $headers);

    // Alternative: Using PHPMailer (uncomment and configure)
    /*
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUsername;
        $mail->Password = $smtpPassword;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtpPort;

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email sending failed: " . $mail->ErrorInfo);
        return false;
    }
    */
}
