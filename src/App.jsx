import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Pessoas from './pages/Pessoas';

function Home() {
  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050d1a] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas" element={<Pessoas />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
