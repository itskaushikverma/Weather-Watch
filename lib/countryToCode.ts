import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

export default function countrytoCode(country: string) {
  return countries.getAlpha2Code(country, 'en');
}
