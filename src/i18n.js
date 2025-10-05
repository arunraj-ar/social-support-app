import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      home: {
        title: "Welcome to the Social Support Application",
        desc: "Apply for government financial assistance quickly and securely. Complete a few simple steps to share your details and explain your situation.",
        start: "Start Application"
      },
      success: {
        title: "Application Submitted Successfully",
        message: "Thank you for submitting your application for financial assistance. Our team will review your information and contact you if additional details are required.",
        back: "Back to Home"
      },
      help: {
        helpMeWrite: "Help Me Write",
        reset: "Reset",
        discard: "Discard",
        accept: "Accept"
      },
      nav: {
        back: "Back",
        next: "Next",
        submit: "Submit"
      },
      validation: {
        required: "This field is required",
      },
      header: {
        title: "Social Support Application",
        subtitle: "Apply for assistance"
      }
      // ... add more keys for labels, placeholders, errors, etc.
    }
  },
  ar: {
    translation: {
      home: {
        title: "مرحبًا بك في نموذج الدعم الاجتماعي",
        desc: "قدّم طلبًا للحصول على مساعدة مالية حكومية بسرعة وأمان. أكمل بعض الخطوات البسيطة لمشاركة بياناتك وشرح حالتك.",
        start: "ابدأ التقديم"
      },
      success: {
        title: "تم إرسال الطلب بنجاح",
        message: "شكرًا لتقديمك طلب المساعدة المالية. سيراجع فريقنا معلوماتك ويتواصل معك في حال وجود أي استفسارات إضافية.",
        back: "العودة إلى البداية"
      },
      help: {
        helpMeWrite: "أساعدني بالكتابة",
        reset: "إعادة",
        discard: "رفض",
        accept: "قبول"
      },
      nav: {
        back: "السابق",
        next: "التالي",
        submit: "إرسال"
      },
      validation: {
        required: "هذا الحقل مطلوب"
      },
      header: {
        title: "تطبيق الدعم الاجتماعي",
        subtitle: "قدّم طلبًا للمساعدة"
      }
      // ... add more Arabic translations
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  })

export default i18n
