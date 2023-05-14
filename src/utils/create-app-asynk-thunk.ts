import { createAsyncThunk } from '@reduxjs/toolkit'

import { ResponseType } from '../api/instans-api'
import { AppRootState, ThunkDispatchType } from '../app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  dispatch: ThunkDispatchType
  rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
  data: ResponseType
  showGlobalError: boolean
}
