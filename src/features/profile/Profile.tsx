import React, { useState } from 'react'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import { Avatar, Box, IconButton, Paper, TextField, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import SuperButton from '../../common/components/c2-SuperButton/SuperButton'
import { logoutTC, updateUserTC } from '../login/auth-slice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { dataForProfilePage, isLoggedIn } = useAppSelector(state => state.auth)
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>()

  const onClickEditMode = () => setEditMode(true)
  const onClickSaveChange = () => {
    dispatch(updateUserTC({ name }))
    setEditMode(false)
  }
  const onClickLogout = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Paper
      sx={{
        padding: '20px',
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography marginBottom={'30px'} component="h1" sx={{ fontSize: '26px', fontWeight: '600' }}>
        Personal Information
      </Typography>
      <Avatar
        alt="Remy Sharp"
        sx={{ width: '80px', height: '80px', marginBottom: '30px' }}
        src={dataForProfilePage.avatar ? dataForProfilePage.avatar : '/static/images/avatar/2.jpg'}
      />

      {isEditMode ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'end' }}>
          <TextField
            label="Nickname"
            variant="standard"
            size={'small'}
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value)
            }}
          />
          <IconButton aria-label="nickname editor" size={'small'} onClick={onClickSaveChange}>
            <SaveAsIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
            {dataForProfilePage.name ? dataForProfilePage.name : ''}
          </Typography>
          <ModeEditOutlineOutlinedIcon
            fontSize={'small'}
            sx={{ cursor: 'pointer' }}
            onClick={onClickEditMode}
          />
        </Box>
      )}

      <SuperButton
        onClick={onClickLogout}
        style={{
          borderRadius: '30px',
          marginTop: '40px',
          width: '100%',
          padding: '17px 0',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Logout
      </SuperButton>
    </Paper>
  )
}
