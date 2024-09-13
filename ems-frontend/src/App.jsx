import './App.css'
import { Header } from './components/Header'
import { EmployeeSheet } from './components/EmployeeSheet'
import { ListofEmployee } from './components/ListofEmployee'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/" element={<ListofEmployee/>}></Route>
      <Route path ="/employees" element={<ListofEmployee/>}></Route>
      <Route path ="/addEmployee" element={<EmployeeSheet/>}></Route>
      <Route path='/edit-employee/:id' element = { <EmployeeSheet /> }></Route>

      
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
