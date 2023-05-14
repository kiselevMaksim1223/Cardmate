import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'

import { DemoComponent } from './packs-navigation/demoComponent'

export const Cards = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <DemoComponent />
    </div>
  )
}
