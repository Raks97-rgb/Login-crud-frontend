import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/registerform' element={<RegisterForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;