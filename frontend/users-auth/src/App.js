//import routs
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import PatientList from './pages/PatientList'
import Prescription from './pages/PrescriptionForm';


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/PrescriptionForm' element={<Prescription />} />
        <Route path='/PatientList' element={<PatientList />} />
      </Routes>
    </div>
  );
}

export default App;