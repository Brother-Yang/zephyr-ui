import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'zephyr-react-ui/dist/zephyr-react-ui.css';

createRoot(document.getElementById('root')!).render(<App />);
