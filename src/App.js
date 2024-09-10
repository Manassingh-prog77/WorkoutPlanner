import Navbar from "./components/Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HowItWorks from "./Howitwok";
import Features from "./Features";
import Footer from "./components/Footer";
import Description from "./components/description";
import SuggestedWorkout from "./components/SuggestedWorkout";
import PlansSection from "./Plan";
import LoginPage from "./Login";
import PremiumLoginPage from "./PremiumLogin";
import ContactPage from "./Contact";
import SubmissionSuccess from "./components/ContactRedirect";
import PremiumHome from "./PHome";
import CreateUser from "./createUser";
import BuyNow from "./components/BuyNow";
import AccountInfo from "./components/AccountInfo"
import YogaAndMeditation from "./components/Yoga";
import AboutUs from "./components/AboutUs";
import PPTOS from "./components/PPTOS";

function App() {
  return (
   <>
   <Router>
    <Navbar />
    <div style={{height:"100px"}}></div>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Howitworks" element={<HowItWorks />} />
    <Route path="/Features" element={<Features />} />
    <Route path="/description/:bodyPart/:exerciseName" element={<Description />} />
    <Route path="/suggest/:bodyPart" element={<SuggestedWorkout />} />
    <Route path="/Plan" element={<PlansSection />} />
    <Route path="/Login" element={<LoginPage />} />
    <Route path="/PremiumLogin" element={<PremiumLoginPage />} />
    <Route path="/Contact" element={<ContactPage />} />
    <Route path="/ContactRedirect/:type" element={<SubmissionSuccess />} />
    <Route path="/PHome" element={<PremiumHome />} />
    <Route path="/createUser" element={<CreateUser />}></Route>
    <Route path="/buy-now" element={<BuyNow />} />
    <Route path="/AccountInfo" element={<AccountInfo />}></Route>
    <Route path="/Yoga" element={<YogaAndMeditation />}></Route>
    <Route path="/AboutUs" element={<AboutUs />}></Route>
    <Route path="/PPTOS" element={<PPTOS />}></Route>
    </Routes>
    <Footer />
    </Router>
   </>
  );
}

export default App;

