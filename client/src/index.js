import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from "./pages/storeUser"
import employeeReducer from "./pages/storeEmployee"
import { ThemeProvider } from '@material-tailwind/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
  }
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />  
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
