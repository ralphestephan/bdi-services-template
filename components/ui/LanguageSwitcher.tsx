import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages, defaultLanguage, languageNames } from '@/lib/languages';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLang = languages.find(lang => pathname.startsWith(`/${lang}`)) || defaultLanguage;
  const path = pathname.replace(/^\/[a-z]{2}/, '') || '/';

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      {languages.map((lang) => (
        <Link
          key={lang}
          href={lang === defaultLanguage ? path : `/${lang}${path}`}
          className={`text-sm ${
            currentLang === lang ? 'font-bold' : 'hover:underline'
          }`}
        >
          {languageNames[lang]}
        </Link>
      ))}
    </div>
  );
}