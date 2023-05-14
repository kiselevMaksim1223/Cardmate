import React from 'react'

import { NavLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div>
      <NavLink to={'/profile'}>Profile</NavLink>---
      <NavLink to={'/login'}>Login</NavLink>---
      <NavLink to={'/registration'}>Registration</NavLink>---
      <NavLink to={'/password_recovery'}>Password recovery</NavLink>---
      <NavLink to={'/entering_new_password'}>New password</NavLink>---
    </div>
  )
}
