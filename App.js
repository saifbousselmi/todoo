import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './pages/Todo';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo-app" element={<Todo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;
