import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authApi, RequiredLoginDataType, UserInfoType, UserDataType } from '../../api/auth-api'

type initialStateType = {
  isLoggedIn: boolean
  isInitialized: boolean
  dataForProfilePage: Partial<UserInfoType>
}

const initialState: initialStateType = {
  isLoggedIn: false,
  isInitialized: false,
  dataForProfilePage: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setInitialState: (state, action: PayloadAction<{ data: UserInfoType }>) => {
      state.dataForProfilePage = action.payload.data
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
// export const {setIsLoggedInAC, setInitialStateAC} = authSlice.actions

// thunks
export const loginTC = (data: RequiredLoginDataType) => (dispatch: Dispatch) => {
  authApi
    .login(data)
    .then(res => {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
      dispatch(authActions.setInitialState({ data: res.data }))
    })
    .catch(e => {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'

      console.log('Error: ', { ...error })
    })
}

export const meTC = () => (dispatch: Dispatch) => {
  authApi
    .me()
    .then(res => {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(authActions.setInitialState({ data: res.data }))
    })
    .catch(e => {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'

      console.log('Error: ', { ...error })
    })
    .finally(() => {
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
    })
}

export const updateUserTC = (userData: UserDataType) => (dispatch: Dispatch) => {
  authApi.updatedUser(userData).then(res => {
    dispatch(authActions.setInitialState({ data: res.data.updatedUser }))
  })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  authApi.logout().then(res => {
    dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
    console.log(res.data.info)
  })
}
