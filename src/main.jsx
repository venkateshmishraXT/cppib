import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Welcome } from './pages/welcome'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" exact element={ <App/> } />
        <Route path="/welcome" exact element={ <Welcome/> } />
      </Routes>
    </Router>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
