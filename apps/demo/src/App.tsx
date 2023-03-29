import CTA from "src/components/CTAs";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Popover from "src/components/Popover";
import Product from "src/components/Product";
import SignUp from "src/components/SignUp";
import { LetsTourProvider } from "@owenjs/lets-tour";
import { TOUR_STEPS } from "src/constants";

function App() {
  return (
    <LetsTourProvider Component={Popover} steps={TOUR_STEPS}>
      <Header />
      <CTA />
      <Product />
      <SignUp />
      <Footer />
    </LetsTourProvider>
  );
}

export default App;
