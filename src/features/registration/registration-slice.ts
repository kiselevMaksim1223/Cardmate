import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '../../api/auth-api'
import { AppRootState } from '../../app/store'
import { createAppAsyncThunk } from '../../utils/create-app-asynk-thunk'

const registerThunk = createAppAsyncThunk<
  { isRegistered: boolean; isError: null | string },
  { email: string; password: string },
  { rejectValue: string; state: AppRootState }
>('auth/register', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    await authApi.register(arg.email, arg.password)

    return { isRegistered: true, isError: null }
  } catch (e: any) {
    return rejectWithValue(e.response.data.error) //передаст ошибку с сервера, в extra reducer(action.payload)
  }
})

type initialStateType = {
  isRegistered: boolean
  isError: string | null | undefined
}

const initialState: initialStateType = {
  isRegistered: false,
  isError: null as string | null | undefined,
}

export const registrationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isRegistered = action.payload.isRegistered
      })
      .addCase(registerThunk.rejected, (state, action) => {
        console.log(action.payload)
        state.isError = action.payload
      })
  },
})

export const registrationReducer = registrationSlice.reducer
export const {} = registrationSlice.actions
export const registrationThunks = { registerThunk }
