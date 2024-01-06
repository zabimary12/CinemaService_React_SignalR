import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import App from './App'
import './EnterVM.css'


const EnterVM = () => {
  return (
    <div className="EnterVM" style={{margin: 'auto', position: 'absolute', top: '20%', color: 'whitesmoke' }}>
        <Routes>
          <Route exact path="/" Component={SignUp} />
          <Route exact path="/SignIn" Component={SignIn} />
          <Route exact path="/App" Component={App} />
        </Routes>
    </div>
  )
}

export default EnterVM