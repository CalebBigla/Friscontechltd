import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { getRouter } from './router';
import './styles.css';

// Create router instance
const router = getRouter();

// Render app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  
  // Only use StrictMode in development
  // In production, StrictMode can cause auth issues with double-mounting
  if (import.meta.env.DEV) {
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    );
  } else {
    root.render(<RouterProvider router={router} />);
  }
}
