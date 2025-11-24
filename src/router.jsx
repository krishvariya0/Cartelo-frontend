import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthModel from "./components/auth/authModel";
import LogIn from "./components/auth/logIn";
import SignUp from "./components/auth/signUp";
import PrivacyPolicy from "./components/Conditions/sapport";
import TermsOfUse from "./components/Conditions/Terms";
import Layout from "./components/layout/Layout";
import BuyAgain from "./components/pages/BuyAgain";
import Electronics from "./components/pages/category/Electronics";
import Fashion from "./components/pages/category/Fashion";
import HomeGarden from "./components/pages/category/Home-Garden";
import Sports from "./components/pages/category/Sports";
import Customer from "./components/pages/Customer";
import Ebooks from "./components/pages/ebooks";
import Fresh from "./components/pages/Fresh";
import GiftCards from "./components/pages/GiftCards";
import History from "./components/pages/History";
import TodayDeal from "./components/pages/TodayDeal";
import TopPics from "./components/pages/TopPics";
import ProfilePage from "./components/profile/profile";
import SellerAuth from "./components/Sellers/SellerAuth";
import SellerPrivacy from "./components/Sellers/SellerPrivacy";
import SellerSignUp from "./components/Sellers/SellerSignUp";
import SellerTerms from "./components/Sellers/SellerTearms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "fresh",
        element: <Fresh />,
      },
      {
        path: "todays-deals",
        element: <TodayDeal />,
      },
      {
        path: "customer-service",
        element: <Customer />,
      },
      {
        path: "buy-again",
        element: <BuyAgain />,
      },
      {
        path: "browsing-history",
        element: <History />,
      },
      {
        path: "ebooks",
        element: <Ebooks />,
      },
      {
        path: "top-picks",
        element: <TopPics />,
      },
      {
        path: "gift-cards",
        element: <GiftCards />,
      },
      {
        path: "electronics",
        element: <Electronics />,
      },
      {
        path: "fashion",
        element: <Fashion />,
      },
      {
        path: "homegarden",
        element: <HomeGarden />,
      },
      {
        path: "sports",
        element: <Sports />,
      },
      {
        path: "authModel",
        element: <AuthModel />,
      },
      {
        path: "ProfilePage",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/termsofuse",
    element: <TermsOfUse />
  },
  {
    path: "/privacypolicy",
    element: <PrivacyPolicy />
  },
  {
    path: "/SellerAuth",
    element: <SellerAuth />
  },
  {
    path: "/SellerSignUp",
    element: <SellerSignUp />
  },
  {
    path: "/SellerPrivacy",
    element: <SellerPrivacy />
  },
  {
    path: "/SellerTerms",
    element: <SellerTerms />
  },
]);

export default router;
