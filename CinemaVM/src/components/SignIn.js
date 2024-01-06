import React, { useState } from 'react'
import AuthServices from '../services/AuthServices'
//import './SignUp.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Link, useNavigate } from 'react-router-dom';

const authServices = new AuthServices()

export default function SignIn() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    Radiovalue: 'User',
    UserName: '',
    UserNameFlag: false,
    Password: '',
    PasswordFlag: false,
    open: false,
    Message: '',
  });

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState((prevState) => ({ ...prevState, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    navigate('/');
  };

  const CheckValidation = () => {
    console.log('CheckValidation Calling...');

    setState((prevState) => ({
      ...prevState,
      UserNameFlag: false,
      PasswordFlag: false,
    }));

    if (state.UserName === '') {
      setState((prevState) => ({ ...prevState, UserNameFlag: true }));
    }
    if (state.Password === '') {
      setState((prevState) => ({ ...prevState, PasswordFlag: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckValidation();
    if (state.UserName !== '' && state.Password !== '') {
      console.log('Acceptable');
      let data = {
        Name: state.UserName,
        Password: state.Password,
      };
      authServices
        .SignIn(data)
        .then((data) => {
          console.log('Data : ', data);
          if (data.data.isSuccess) {
            navigate('/App', { state: { userName: state.UserName }})
          } else {
            console.log('Something Went Wrong');
            setState((prevState) => ({
              ...prevState,
              open: true,
              Message: 'LogIn UnSuccessfully',
            }));
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
          setState((prevState) => ({
            ...prevState,
            open: true,
            Message: 'Something Went Wrong',
          }));
        });
    } else {
      console.log('Not Acceptable');
      setState((prevState) => ({
        ...prevState,
        open: true,
        Message: 'Please Field Mandetory Field',
      }));
    }
  };

  console.log('State : ', state);

  return (
    <div className="SignUp-Container">
      <div className="SignUp-SubContainer">
      <h2 className="Header"style={{ color: 'Black', fontWeight: 'bold' }}>Sign In</h2>
        <div className="Body">
          <form className="form">
            <TextField
              className="TextField"
              name="UserName"
              label="UserName"
              variant="outlined"
              size="small"
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
          </form>
        </div>
        <div className="Buttons" style={{ alignItems: 'flex-start' }}>
          <Button className="Btn" color="primary" component={Link} to={'/'}>
            Sign Up
          </Button>
          <Button
            className="Btn"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign In
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
};