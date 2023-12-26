import { useState, useEffect } from 'react'
import * as React from 'react';

import { userService } from '../services/user.service'
import { Input } from '@mui/joy'
import { Field, Form, Formik } from "formik"
import { AirbnbBtn } from './AirbnbBtn';
import { useSelector } from 'react-redux';
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from '../store/system.reducer';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login } from '../store/user.actions';


export function LoginSignup(props) {
  const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function onLogin(values) {
    if (!values.username || !values.password) return
    setLogin(values)
  }

  async function setLogin(credentials) {
    try {
      const user = await login(credentials)
      await props.onClose()
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }

  function onSignup(values) {
    if (!values.username || !values.password || !values.fullname) return
    props.onSignup(values)
    clearState()
    props.onClose()
  }

  function onSubmit(values) {
    console.log(values);
    if (appModal === SET_APP_MODAL_LOGIN) onLogin(values)
    else onSignup(values)
  }

  return (
    <div className='login-page'>
      <Formik initialValues={credentials} onSubmit={onSubmit}>
        <Form className='form-container'>
          {appModal === SET_APP_MODAL_SIGNUP && <Field placeholder='Full name' name='fullname' as={Input} label="Fullname" />}
          <Field placeholder='Username' name='username' as={Input} label="Username" />
          <Field placeholder='Password' name='password' as={Input} label="Password" type='password' />

          <AirbnbBtn txt={appModal === SET_APP_MODAL_LOGIN ? 'Login' : 'Register'} callBackFunction={onSubmit} />
        </Form>
      </Formik>
    </div>
  )
}