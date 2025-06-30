import React, { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'fr', name: 'Français', flag: 'fr', targetUrl: '/fr' },
  { code: 'en', name: 'English', flag: 'gb', targetUrl: '/en' },
];

export default function LanguageSwitcher() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const currentLocale = currentPath.startsWith('/en') ? 'en' : 'fr';
  const currentLanguage = languages.find((lang) => lang.code === currentLocale);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={menuRef}>
      <button
        type="button"
        className="group -m-1 p-1 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
        aria-label="Changer de langue"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="h-6 w-6 flex items-center justify-center text-muted-foreground transition group-hover:text-primary">
          <img
            src={`https://flagcdn.com/w20/${currentLanguage?.flag}.png`}
            alt={`Drapeau ${currentLanguage?.name}`}
            width={20}
            height={15}
            className="object-contain"
          />
        </span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-max min-w-[200px] rounded-md border border-border bg-popover text-popover-foreground shadow-md z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer ${
                lang.code === currentLocale ? 'bg-accent' : ''
              }`}
              onClick={() => (window.location.href = lang.targetUrl)}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {lang.code === currentLocale && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="text-primary"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m2.75 8.75l3.5 3.5l7-7.5"
                    />
                  </svg>
                )}
              </span>
              <img
                src={`https://flagcdn.com/w20/${lang.flag}.png`}
                alt={`Drapeau ${lang.name}`}
                width={20}
                height={15}
                className="object-contain"
              />
              <span className="truncate">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
