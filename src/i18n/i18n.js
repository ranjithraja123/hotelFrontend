import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Initializes i18next for React
  .init({
    resources: {
      en: {
        translation: {
          navbar: { home: "Home", about: "About Hotel", addRooms: "Add Rooms" },
          details: { title: "Room Details" },
          footer: { copyright: "All rights reserved." },
        },
      },
      fr: {
        translation: {
          navbar: { home: "Accueil", about: "À propos de l'hôtel", addRooms: "Ajouter des chambres" },
          details: { title: "Détails de la chambre" },
          footer: { copyright: "Tous droits réservés." },
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback if translation is missing
    interpolation: { escapeValue: false },
  });

export default i18n;
