import React, { useState } from 'react'
//import './SignUp.scss'
import AuthServices from '../services/AuthServices.js'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Link, useNavigate } from 'react-router-dom';

const authServices = new AuthServices();

export default function SignUp() {
  const [state, setState] = useState({
    UserName: '',
    Password: '',
    ConfirmPassword: '',
    UserNameFlag: false,
    PasswordFlag: false,
    ConfirmPasswordFlag: false,
    open: false,
    Message: '',
  });

  const navigate = useNavigate();

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState((prevState) => ({ ...prevState, open: false }));
  }

  const CheckValidity = () => {
    console.log('Check Validity Calling')
    const { UserName, Password, ConfirmPassword } = state;
    // Reset Flag
    setState((prevState) => ({
      ...prevState,
      UserNameFlag: UserName === '',
      PasswordFlag: Password === '',
      ConfirmPasswordFlag: ConfirmPassword === '',
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckValidity();
    const { UserName, Password, ConfirmPassword } = state;

    if (UserName && Password && ConfirmPassword) {
      const data = {
        Name: UserName,
        Password: Password,
        PasswordConfirm: ConfirmPassword,
      }

      authServices
        .SignUp(data)
        .then((data) => {
          console.log('data : ', data)
          if (data.data.isSuccess) {
            console.log('Sign Up Confirmed')
            setState((prevState) => ({ ...prevState, open: true, Message: 'Sign Up Confirmed' }))
            navigate('/SignIn');
          } else {
            console.log('Sign Up Failed')
            setState((prevState) => ({ ...prevState, open: true, Message: 'Sign Up Failed' }))
          }
        })
        .catch((error) => {
          console.log('error : ', error)
          setState((prevState) => ({ ...prevState, open: true, Message: 'Something Went Wrong' }))
        })
    } else {
      console.log('Not Acceptable')
      setState((prevState) => ({ ...prevState, open: true, Message: 'Please Fill Required Field' }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }));
    console.log('Name : ', name, 'Value : ', value)
  }

  console.log('state : ', state)

  return (
    <div className="SignUp-Container" >
      <div className="SignUp-SubContainer">
        <h2 className="Header"style={{ color: 'Black', fontWeight: 'bold' }}>Sign Up</h2>
        <div className="Body" style={{ color: 'white' }}>
          <form className="form" >
            <TextField
              className="TextField"
              name="UserName"
              label="UserName"
              variant="outlined"
              size="small"
              color="white"
              style={{ backgroundColor: 'white' }}
              error={state.UserNameFlag}
              value={state.UserName}
              onChange={handleChange}
            />
            <TextField
              className="TextField"
              type="password"
              name="Password"
              label="Password"
              variant="outlined"
              size="small"
              style={{ backgroundColor: 'white' }}
              error={state.PasswordFlag}
              value={state.Password}
              onChange={handleChange}
            />
            <TextField
              className="TextField"
              type="password"
              name="ConfirmPassword"
              label="Confirm Password"
              variant="outlined"
              size="small"
              style={{ backgroundColor: 'white' }}
              error={state.ConfirmPasswordFlag}
              value={state.ConfirmPassword}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="Buttons">
          <Button className="Btn" color="primary" component={Link} to={'/SignIn'}>
            Sign In
          </Button>
          <Button
            className="Btn"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.Message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

