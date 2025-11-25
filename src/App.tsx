import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import TableDemo from "@/pages/TableDemo";
import FormDemo from "@/pages/FormDemo";
import ControlsDemo from "@/pages/ControlsDemo";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/table" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Table Demo
          </Link>
          <Link to="/controls" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Controls Demo
          </Link>
          <Link to="/form" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Form Demo
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TableDemo />} />
        <Route path="/controls" element={<ControlsDemo />} />
        <Route path="/form" element={<FormDemo />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
