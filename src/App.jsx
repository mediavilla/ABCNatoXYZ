import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesignSystem from './pages/DesignSystem';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Freebies from './pages/Freebies';
import Articles from './pages/Articles';
import Resources from './pages/Resources';
import Feedback from './pages/Feedback';
import Roadmap from './pages/Roadmap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/freebies" element={<Freebies />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
    </Routes>
  );
}