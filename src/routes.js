import BlogInfos from "./Pages/BlogInfos/BlogInfos";
import Blogs from "./Pages/Blogs/Blogs";
import Index from "./Pages/Index/Index";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import OTP from "./Pages/OTP/OTP";
import Carts from "./Pages/Carts/Carts";
import GiftCards from "./Pages/GiftCards/GiftCards";
import Games from "./Pages/Games/Games";
import Services from "./Pages/Services/Services";
import Softwares from "./Pages/Softwares/Softwares";
import Page404 from "./Pages/Page404/Page404";
import Panel from "./Pages/Panel/Panel";
import Dashboard from "./Pages/Panel/Dashboard/Dashboard";
import Orders from "./Pages/Panel/Orders/Orders"
import Tickets from "./Pages/Panel/Tickets/Tickets"
import User from "./Pages/Panel/User/User"
import Wallet from "./Pages/Panel/Wallet/Wallet"
import { Navigate } from "react-router-dom";

const routes = [
    {path:"/", element: <Index />},
    {path:"/blogs", element: <Blogs />},
    {path:"/blogs/:blogName", element: <BlogInfos />},
    {path:"/contact-us", element: <ContactUs />},
    {path:"/about-us", element: <AboutUs />},
    {path:"/login", element: <Login />},
    {path:"/Register", element: <Register />},
    {path:"/otp", element: <OTP />},
    {path:"/carts", element: <Carts />},
    {path:"/gift-cards", element: <GiftCards />},
    {path:"/games", element: <Games />},
    {path:"/services", element: <Services />},
    {path:"/softwares", element: <Softwares />},
    {path:"/*", element: <Page404 />},
    {path:"/panel", element: <Panel />, 
        children:[
        {path: "" ,element: <Navigate to="dashboard"/>},
        {path:"dashboard" , element: <Dashboard />},
        {path:"orders" , element: <Orders />},
        {path:"tickets" , element: <Tickets />},
        {path:"user" , element: <User />},
        {path:"wallet" , element: <Wallet />},
    ]},
]

export default routes