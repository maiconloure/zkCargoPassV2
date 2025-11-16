import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

interface DemoRequestData {
  name: string
  company: string
  email: string
  phone?: string
  message?: string
}

export const sendDemoRequestEmail = async (data: DemoRequestData): Promise<void> => {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY)

    const templateParams = {
      to_email: 'contact@hypherdyne.com',
      from_name: data.name,
      from_email: data.email,
      company: data.company,
      phone: data.phone || 'Not provided',
      message: data.message || 'No additional information provided',
      subject: `Demo Request from ${data.company}`,
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status !== 200) {
      throw new Error('Failed to send email')
    }

    console.log('Demo request email sent successfully:', response)
  } catch (error) {
    console.error('Error sending demo request email:', error)
    throw new Error('Failed to send demo request. Please try again later.')
  }
}
