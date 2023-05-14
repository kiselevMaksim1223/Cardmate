import { instance, ResponseType } from './instans-api'

export const authApi = {
  register(email: string, password: string) {
    return instance.post<ResponseType<AddedUserType>>('auth/register', {
      email,
      password,
    })
  },
  login(data: RequiredLoginDataType) {
    return instance.post<RequiredLoginDataType, ResponseType<UserInfoType>>('auth/login', data)
  },
  me() {
    return instance.post<{}, ResponseType<UserInfoType>>('auth/me', {})
  },
  updatedUser(userData: UserDataType) {
    return instance.put<UserDataType, ResponseType<UpdatedUserType>>('auth/me', userData)
  },
  logout() {
    return instance.delete<{ info: string }>('auth/me')
  },
}

export type RequiredLoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserInfoType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}

export type UserDataType = {
  name?: string
  avatar?: string
}

export type UpdatedUserType = {
  updatedUser: UserInfoType
}

export type AddedUserType = {
  addedUser: UserInfoType
}
