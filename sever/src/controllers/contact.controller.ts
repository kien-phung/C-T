import { handleSubmitContact } from "../repositories/contact.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { sendMail, EmailTemplate } from "../utils/libs/mailer.js";
import { ROOT_EMAIL } from "../utils/configs/constants.js";

export interface ISubmitContactData {
  name: string,
  email: string,
  address: string,
  phone: string,
  message: string,
  submit_type: string,
  language?: string
};

export const submitContact = RequestHandlerCustom(
  async (req, res) => {
    const data: ISubmitContactData = parseRequestData(req);
    const contact = await handleSubmitContact(data);

    // Get current date and time for email
    const submittedAt = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    try {
      // Send notification email to admin
      await sendMail(
        ROOT_EMAIL,
        `Liên hệ mới từ ${data.name}`,
        EmailTemplate.ADMIN_NOTIFICATION,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          message: data.message,
          submit_type: data.submit_type || 'Liên hệ chung',
          submittedAt: submittedAt
        }
      );
      console.log('Admin notification email sent successfully to:', ROOT_EMAIL);
    } catch (error) {
      console.error('Error sending admin notification email:', error);
    }

    try {
      // Send confirmation email to customer based on language
      const isEnglish = data.language === 'EN';
      const template = isEnglish ? EmailTemplate.CONTACT_CONFIRMATION_EN : EmailTemplate.CONTACT_CONFIRMATION;
      const subject = isEnglish ? "Thank you for contacting us" : "Cảm ơn bạn đã liên hệ với chúng tôi";

      await sendMail(
        data.email,
        subject,
        template,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          message: data.message
        }
      );
      console.log('Customer confirmation email sent successfully to:', data.email);
    } catch (error) {
      console.error('Error sending customer confirmation email:', error);
    }

    res.status(201).json({
      success: true,
      message: "New contact created and emails sent",
      contact: contact
    });
  }
);