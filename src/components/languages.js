import React from "react";

export default function Languages({ language, onLanguageChange }) {
  const LANGUAGES = [
    { label: "Afrikaans", value: "af" },
    { label: "Arabic", value: "ar" },
    { label: "French", value: "fr" },
    { label: "Hindi", value: "hi" },
    { label: "Japanese", value: "ja" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Chinese", value: "zh" },
    { label: "Spanish", value: "es" },
    { label: "Swahili", value: "sw" },
    { label: "Thai", value: "th" },
  ];
  return (
    <div>
      <label className='label'>Select Language</label>
      <div className='opts'>
        {LANGUAGES.map(({ label, value }) => {
          return (
            <div
              key={label}
              className={`opt ${language === value ? "selected" : ""}`}
              onClick={() => onLanguageChange(value)}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
