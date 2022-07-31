import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import userAlb from '../langs/alb/user.json';
import authAlb from '../langs/alb/auth.json';
import orderAlb from '../langs/alb/order.json';
import reservationAlb from '../langs/alb/reservation.json';
import menuAlb from '../langs/alb/menu.json';
import userEng from '../langs/eng/user.json';
import authEng from '../langs/eng/auth.json';
import orderEng from '../langs/eng/order.json';
import reservationEng from '../langs/eng/reservation.json';
import menuEng from '../langs/eng/menu.json';

export enum I18NNamespaces {
  MENU = 'menu',
  AUTH = 'auth',
  ORDER = 'order',
  RESERVATION = 'reservation',
  USER = 'user',
}

const resources = {
  al: {
    [I18NNamespaces.USER]: userAlb,
    [I18NNamespaces.AUTH]: authAlb,
    [I18NNamespaces.MENU]: menuAlb,
    [I18NNamespaces.ORDER]: orderAlb,
    [I18NNamespaces.RESERVATION]: reservationAlb,
  },
  en: {
    [I18NNamespaces.USER]: userEng,
    [I18NNamespaces.AUTH]: authEng,
    [I18NNamespaces.MENU]: menuEng,
    [I18NNamespaces.ORDER]: orderEng,
    [I18NNamespaces.RESERVATION]: reservationEng,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  // interpolation: {
  //   escapeValue: false,
  // },
  defaultNS: I18NNamespaces.MENU,
});

export default i18n;
