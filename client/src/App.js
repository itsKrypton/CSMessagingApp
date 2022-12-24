import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home';
import { Navbar } from './components/navbar'
import { User } from './pages/User';
import { Employee } from './pages/Employee';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const client = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/users" element={<User />}/>
            <Route path="/employees" element={<Employee />}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
