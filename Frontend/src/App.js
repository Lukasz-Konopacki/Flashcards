import './App.css';
import SetView from './Components/SetView/SetView';
import Menu from './Components/Menu/Menu';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import SetsList from './Components/SetsList/SetsList';
import NotFound from './Components/NotFound/NotFound';
import {createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider} from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" element = {<Root/>}>
          <Route index element={<SetsList/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="set/" element={<SetView/>}/>
          <Route path="set/:setId/:setName" element={<SetView/>}/>
          <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
      <div>
        <RouterProvider router={router}/> 
      </div>
  );
}

const Root = () =>{
  return(
    <div className="container">
      <Menu/>
      <div className='content'>
        <Outlet/>
      </div>
    </div>
  )  
}

export default App;