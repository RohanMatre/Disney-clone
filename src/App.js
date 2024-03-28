import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import PreLoader from './components/PreLoader';
import './App.css';
import React, { useEffect, useState } from 'react';
import Detail from './components/Detail';
import Search from './components/Search';

function App() {
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Simulate loading delay (replace with actual loading logic)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="App">
      {loading ? ( // Display Preloader while loading
        <PreLoader />
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
