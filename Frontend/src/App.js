import './App.css';
import SetView from './Components/SetView/SetView';
import Menu from './Components/Menu/Menu';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import SetsList from './Components/SetsList/SetsList';
import NotFound from './Components/NotFound/NotFound';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}>
              <Route path="/" element={<Root />}>
              <Route path="/" element={<SetsList />}/>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />}/>
              <Route path="/set" element={<SetView />} />
              <Route path="/set/:setId/:setName" element={<SetView />}/>
            </Route>
          </Route>
          <Route path="/login" element={<LogIn/>} />
          <Route path="/register" element={<SignUp/>} />         
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

const Root = () => {
  return (
    <div className="container">
      <Menu />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default App;