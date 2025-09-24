import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Error boundary for React context issues
window.addEventListener('error', (event) => {
  console.error('Global Error:', event.error);
  
  if (event.error?.message?.includes('createContext') || 
      event.error?.message?.includes('Cannot read properties of undefined')) {
    console.error('React Context Error detected, attempting recovery...');
    
    // Clear any existing React root
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = '';
    }
    
    // Wait a bit then reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
});

// Also catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  
  if (event.reason?.message?.includes('createContext')) {
    console.error('React Context Error in promise, reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
});

// Register Service Worker for offline functionality
if ('serviceWorker' in navigator && false) { // Temporarily disabled
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, notify user
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize React app with error handling
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  // Check if React is properly loaded
  if (typeof React === 'undefined') {
    throw new Error('React is not loaded');
  }
  
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error('Failed to initialize React app:', error);
  
  // Show fallback UI
  document.getElementById("root")!.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
    ">
      <h1 style="color: #dc3545; margin-bottom: 1rem;">Application Error</h1>
      <p style="color: #6c757d; margin-bottom: 2rem;">Something went wrong while loading the application.</p>
      <div style="margin-bottom: 2rem;">
        <button onclick="window.location.reload()" style="
          padding: 0.75rem 1.5rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          margin-right: 1rem;
        ">Refresh Page</button>
        <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload();" style="
          padding: 0.75rem 1.5rem;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        ">Clear Cache & Reload</button>
      </div>
      <details style="text-align: left; max-width: 600px; margin-top: 2rem;">
        <summary style="cursor: pointer; color: #007bff;">Error Details</summary>
        <pre style="
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          overflow: auto;
          margin-top: 1rem;
          font-size: 0.875rem;
        ">${error}</pre>
      </details>
    </div>
  `;
}
