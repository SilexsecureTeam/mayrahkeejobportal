import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdAddCircle,
} from "react-icons/md";

const FIXED_LANGUAGES = [
  "English",
  "Hausa",
  "Igbo",
  "Yoruba",
  "Pidgin",
  "Others",
];

export default function LanguagesSpokenSelector({
  selectedLanguages,
  setSelectedLanguages,
  toogleIsOpen,
}) {
  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const customLanguages = selectedLanguages.filter(
    (lang) => !FIXED_LANGUAGES.includes(lang)
  );

  return (
    <div className="flex flex-col gap-4 border-b pb-4">
      <h3 className="font-semibold text-lg">Languages Spoken</h3>
      <div className="flex flex-wrap gap-3">
        {FIXED_LANGUAGES.map((lang) => (
          <div
            key={lang}
            className="flex items-center cursor-pointer gap-1 text-lg"
          >
            {lang !== "Others" ? (
              selectedLanguages.includes(lang) ? (
                <MdCheckBox onClick={() => toggleLanguage(lang)} />
              ) : (
                <MdCheckBoxOutlineBlank onClick={() => toggleLanguage(lang)} />
              )
            ) : (
              <MdAddCircle onClick={toogleIsOpen} />
            )}
            <span>{lang}</span>
          </div>
        ))}
      </div>

      {customLanguages.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {customLanguages.map((lang) => (
            <div
              key={lang}
              className="flex items-center cursor-pointer gap-1 text-lg"
            >
              <MdCheckBox onClick={() => toggleLanguage(lang)} />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
