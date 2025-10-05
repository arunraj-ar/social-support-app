import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: {
        title: "Welcome to the Social Support Application",
        desc: "Apply for government financial assistance quickly and securely. Complete a few simple steps to share your details and explain your situation.",
        start: "Start Application",
      },
      success: {
        title: "Application Submitted Successfully",
        message:
          "Thank you for submitting your application for financial assistance. Our team will review your information and contact you if additional details are required.",
        back: "Back to Home",
      },
      nav: {
        back: "Back",
        next: "Next",
        submit: "Submit",
      },
      validation: {
        required: "This field is required",
      },
      header: {
        title: "Social Support Application",
        subtitle: "Apply for assistance",
      },
      personal: {
        title: "Personal Information",
        name: "Full Name",
        id: "National ID",
        email: "Email Address",
        phone: "Phone Number",
        dob: "Date of Birth",
        gender: "Gender",
        address: "Address",
        city: "City",
        state: "State/Province",
        country: "Country",
        genderOptions: {
          male: "Male",
          female: "Female",
          other: "Other",
        },
        select: "Select",
      },
      situation: {
        title: "Situation Descriptions",
        financialLabel: "Describe your financial situation",
        employmentLabel: "Describe your employment situation",
        reasonLabel: "Reason for applying for assistance",
        financial: "financial",
        employment: "employment",
        reason: "reason",
      },
      help: {
        helpMeWrite: "Help Me Write",
        reset: "Reset",
        accept: "Accept",
        close: "Close",
        generating: "Generating Response...",
        suggestion: "Suggestion for",
      },

      error: {
        required: "is required",
        validPhone: "Enter a valid phone number",
        enterPhone: "Enter your phone number",
        validEmail: "Enter a valid email address",
      },
      buttons: {
        clear: "Clear",
        cancel: "Cancel",
        submit: "Submit",
        next: "Next",
        back: "Back",
      },
      progress: {
        step: "Step",
      },
    },
  },
  ar: {
    translation: {
      home: {
        title: "مرحبًا بك في نموذج الدعم الاجتماعي",
        desc: "قدّم طلبًا للحصول على مساعدة مالية حكومية بسرعة وأمان. أكمل بعض الخطوات البسيطة لمشاركة بياناتك وشرح حالتك.",
        start: "ابدأ التقديم",
      },
      success: {
        title: "تم إرسال الطلب بنجاح",
        message:
          "شكرًا لتقديمك طلب المساعدة المالية. سيراجع فريقنا معلوماتك ويتواصل معك في حال وجود أي استفسارات إضافية.",
        back: "العودة إلى البداية",
      },
      nav: {
        back: "السابق",
        next: "التالي",
        submit: "إرسال",
      },
      validation: {
        required: "هذا الحقل مطلوب",
      },
      header: {
        title: "تطبيق الدعم الاجتماعي",
        subtitle: "قدّم طلبًا للمساعدة",
      },
      personal: {
        title: "معلومات شخصية",
        name: "الاسم الكامل",
        id: "الهوية الوطنية",
        email: "بريد إلكتروني",
        phone: "هاتف",
        dob: "تاريخ الميلاد",
        gender: "جنس",
        address: "عنوان",
        city: "مدينة",
        state: "الولاية/المقاطعة",
        country: "دولة",
        genderOptions: {
          male: "ذكر",
          female: "أنثى",
          other: "آخر",
        },
        select: "اختر",
      },
      situation: {
        title: "وصف الموقف",
        financialLabel: "وصف وضعك المالي",
        employmentLabel: "وصف وضعك الوظيفي",
        reasonLabel: "سبب التقدم بطلب المساعدة",
        financial: "مالي",
        employment: "توظيف",
        reason: "سبب",
      },
      help: {
        helpMeWrite: "أساعدني بالكتابة",
        reset: "إعادة",
        accept: "قبول",
        close: "يغلق",
        generating: "جاري توليد الاستجابة...",
        suggestion: "اقتراح ل",
      },
      error: {
        required: "مطلوب",
        validPhone: "أدخل رقم هاتف صالح",
        enterPhone: "أدخل رقم هاتفك",
        validEmail: "أدخل عنوان بريد إلكتروني صالح",
      },
      buttons: {
        clear: "واضح",
        cancel: "يلغي",
        submit: "يُقدِّم",
        next: "التالي",
        back: "خلف",
      },
      progress: {
        step: "خطوة",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
