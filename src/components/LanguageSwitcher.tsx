import { useLanguage } from "@/context/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="language-switch" className={language === "ru" ? "font-bold" : ""}>
        RU
      </Label>
      <Switch
        id="language-switch"
        checked={language === "en"}
        onCheckedChange={(checked) => setLanguage(checked ? "en" : "ru")}
      />
      <Label htmlFor="language-switch" className={language === "en" ? "font-bold" : ""}>
        EN
      </Label>
    </div>
  );
} 