import Navbar from '../components/Navbar';
import Header from '../components/Header';
import CallToAction from '../components/CallToAction';
import Form from '../components/Form';
import PerksSection from '../components/PerksSection';
import Research from '../components/Research';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Header />
      <CallToAction />
      <main>
        <Form />
        <PerksSection />
        <div id="research">
          <Research />
        </div>
      </main>
      <Footer />
    </div>
  );
} 