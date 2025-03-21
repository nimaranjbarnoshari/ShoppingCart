import {
  createContext
} from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userInfos: null,
  totalPrice: NaN,
  accountBalance: 0,
  back_url: "",
  allUsers: {},
  userBasket: [],
  giftsCategory: [],
  allGamesData: [],
  allaccounts: [],
  allGifts: [],
  allSoftwares: [],
  allAccessories: [],
  allMoney: [],
  userPays: [],
  userOrders: [],
  userTickets: [],
  userNotifications: [],
  articles: [],
  setData: () => {},
  login: () => {},
  logout: () => {},
  addToBasket: () => {},
  addCount: () => {},
  minusCount: () => {},
  removeFromBasket: () => {},
  chargeBalance: () => {},
  payHandler: () => {},
  sendComments: () => {},
  changePassword: () => {}
});

export default AuthContext;