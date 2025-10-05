import "./App.css";
import { Routes, Route } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import FamilyFinancialInfo from "./pages/FamilyFinancialInfo";
import SituationDescriptions from "./pages/SituationDescriptions";
import SuccessPage from "./pages/SuccessPage";
import { FormProvider } from "./context/FormContext";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home";
import FormLayout from "./components/FormLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Header from "./components/Header";
/*
  Main Application Component - Sets up routing and language. 
  Wraps the app in FormProvider for state management. 
  Applies theme and handles RTL for Arabic language.
  Defines routes for home, form steps, and success page.
  Step routes are nested within FormLayout for having progress bar common to all of them.
*/
export default function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = i18n.language || "en";
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  return (
    <FormProvider>
      <Header />
      <div className="min-h-screen flex items-center justify-center md:p-6 p-0">
        <div
          className={`
            w-full md:w-4/5 lg:w-1/2   
            max-w-3xl                
            min-w-[320px]            
            ${theme.layers.elevated} shadow-lg md:rounded-xl
            md:p-8 space-y-4 p-2
            min-h-[100dvh] md:min-h-0 lg:min-h-0
          `}
        >
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route element={<FormLayout />}>
                <Route path="/personal" element={<PersonalInfo />} />
                <Route path="/family" element={<FamilyFinancialInfo />} />
                <Route path="/situation" element={<SituationDescriptions />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
