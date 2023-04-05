import './App.css';
import SignUp from './components/register/signUp';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/login/login';
import LandingPage from './components/landingPage/landingPage';
import Upload from './components/uploadImage/upload';
import ProtectedRoutes from './components/protectedRoutes/protect.jsx';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route element={<ProtectedRoutes/>}/>
          <Route path='/images' element={<LandingPage/>}/>
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
