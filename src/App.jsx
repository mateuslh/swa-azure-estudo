import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Architecture from './components/Architecture';
import Services from './components/Services';
import Advantages from './components/Advantages';
import Comparison from './components/Comparison';
import GlobalCoverage from './components/GlobalCoverage';
import Pricing from './components/Pricing';
import Governance from './components/Governance';
import Conclusion from './components/Conclusion';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white">
      <Navbar />
      <Hero />
      <Timeline />
      <Architecture />
      <Services />
      <Advantages />
      <Comparison />
      <GlobalCoverage />
      <Pricing />
      <Governance />
      <Conclusion />
    </div>
  );
}
