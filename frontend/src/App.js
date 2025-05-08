import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ItemList />} />
            </Routes>
        </Router>
    );
}

export default App;
