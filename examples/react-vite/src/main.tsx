import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import '@zephyr-ui/ui/dist/ui.css';

createRoot(document.getElementById('root')!).render(<App />);
