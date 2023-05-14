import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/store'
import SuperButton from '../../common/components/c2-SuperButton/SuperButton'

import { registrationThunks } from './registration-slice'

type FormData = yup.InferType<typeof schema>

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export const Registration = () => {
  const isRegistered = useAppSelector(state => state.register.isRegistered)
  const isError = useAppSelector(state => state.register.isError)
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log({ email, password })
    dispatch(registrationThunks.registerThunk({ email, password }))
  })

  useEffect(() => {
    ;(errors.password || errors.confirmPassword || isError) &&
      reset({ password: '', confirmPassword: '' })
  }, [reset, isError, errors.password, errors.confirmPassword])

  if (isRegistered) {
    return <Navigate to={'/login'} />
  }

  return (
    <Grid container justifyContent={'center'} textAlign={'center'} alignItems={'center'}>
      <Paper sx={{ padding: '20px', marginTop: 6 }}>
        <Typography
          marginBottom={'20px'}
          component="h1"
          sx={{ fontSize: '26px', fontWeight: '600' }}
        >
          Sign up
        </Typography>

        <form onSubmit={onSubmit}>
          <FormGroup sx={{ alignItems: 'center', fontSize: '16px', fontWeight: '500' }}>
            <FormControl
              sx={{ m: 1, width: '35ch' }}
              variant="standard"
              fullWidth
              error={!!errors.email?.message || !!isError}
            >
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type={'email'}
                color={errors.email?.message ? 'error' : 'primary'}
                {...register('email')}
              />
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.email?.message}</p>
            </FormControl>

            <FormControl
              sx={{ width: '35ch' }}
              variant="standard"
              error={!!errors.password?.message || !!isError}
            >
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      color={errors.password?.message ? 'error' : 'default'}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.password?.message}</p>
            </FormControl>

            <FormControl
              sx={{ width: '35ch' }}
              variant="standard"
              error={!!errors.confirmPassword?.message || !!isError}
            >
              <InputLabel htmlFor="standard-adornment--confirm-password">
                Confirm password
              </InputLabel>
              <Input
                id="standard-adornment--confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      color={errors.confirmPassword?.message ? 'error' : 'default'}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword?.message}</p>
            </FormControl>

            <SuperButton
              type={'submit'}
              style={{
                borderRadius: '30px',
                marginTop: '40px',
                width: '100%',
                padding: '17px 0',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Sign Up
            </SuperButton>

            <p>{isError?.length && isError}</p>

            <Typography
              fontSize={'14px'}
              fontWeight={'500'}
              color={'#0000008a'}
              variant={'caption'}
              margin={'30px 0 10px'}
            >
              Already have an account?
            </Typography>

            <NavLink to={'/login'} style={{ fontSize: '16px', fontWeight: '600' }}>
              Sign In
            </NavLink>
          </FormGroup>
        </form>
      </Paper>
    </Grid>
  )
}
