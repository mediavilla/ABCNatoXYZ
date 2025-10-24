import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesignSystem from './pages/DesignSystem';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design-system" element={<DesignSystem />} />
    </Routes>
  );
}