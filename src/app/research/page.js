import Navbar from '../../components/Navbar';
import Research from '../../components/Research';
import Footer from '../../components/Footer';

export default function ResearchPage() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main>
        <Research />
      </main>
      <Footer />
    </div>
  );
} 