export const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.insights": "Insights",
    "common.readMore": "Read More",
    "common.contactUs": "Contact Us",
    "common.learnMore": "Learn More",
    "home.hero.title": "Your Business Intelligence Partner",
    "home.hero.subtitle": "Transform your business with data-driven insights",
    // Add more translations as needed
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.about": "عن الشركة",
    "nav.contact": "اتصل بنا",
    "nav.insights": "رؤى وتحليلات",
    "common.readMore": "اقرأ المزيد",
    "common.contactUs": "اتصل بنا",
    "common.learnMore": "اعرف المزيد",
    "home.hero.title": "شريكك في ذكاء الأعمال",
    "home.hero.subtitle": "حوّل أعمالك مع رؤى مبنية على البيانات",
    // Add more translations as needed
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslations(locale: keyof typeof translations) {
  return translations[locale];
}