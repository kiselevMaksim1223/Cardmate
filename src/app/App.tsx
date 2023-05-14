import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Cards } from '../features/cards/Cards'
import { NewPassword } from '../features/enteringNewPassword/EnteringNewPassword'
import { ErrorComponent } from '../features/Error/404Error'
import ResponsiveAppBar from '../features/header/Header'
import { meTC } from '../features/login/auth-slice'
import { Login } from '../features/login/Login'
import { Navigation } from '../features/navigate/Navigation'
import { PasswordRecovery } from '../features/passwordRecovery/PasswordRecovery'
import { Profile } from '../features/profile/Profile'
import { Registration } from '../features/registration/Registration'

import { useAppDispatch, useAppSelector } from './store'

export default function App() {
  const dispatch = useAppDispatch()
  const { isInitialized } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(meTC())
  }, [])

  return (
    <div>
      <ResponsiveAppBar />
      <Navigation />
      {!isInitialized ? (
        <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={'/cards'} />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/password_recovery" element={<PasswordRecovery />} />
          <Route path="/entering_new_password" element={<NewPassword />} />
          <Route path="/*" element={<ErrorComponent />} />
        </Routes>
      )}
    </div>
  )
}
