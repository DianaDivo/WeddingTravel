import { ru } from './ru';
import { en } from './en';
import { be } from './be';

export type Language = 'ru' | 'en' | 'be';

export const translations = {
  ru,
  en,
  be,
};

export const languageNames = {
  ru: 'Русский',
  en: 'English',
  be: 'Беларуская',
};

export const languageFlags = {
  ru: '🇷🇺',
  en: '🇬🇧',
  be: '🇧🇾',
};
