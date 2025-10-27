import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DesignSystem from './pages/designsystem';
import About from './pages/about';
import FAQ from './pages/faq';
import Freebies from './pages/freebies';
import Articles from './pages/articles';
import Resources from './pages/resources';
import Feedback from './pages/feedback';
import Roadmap from './pages/roadmap';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Cookies from './pages/cookies';

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