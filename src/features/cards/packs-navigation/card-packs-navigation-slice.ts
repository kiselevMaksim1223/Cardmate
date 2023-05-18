import { createSlice } from '@reduxjs/toolkit'

import {
  CardPacksResponse,
  packsNavigationApi,
  ParamsPacksType,
} from '../../../api/packs-navigation-api'
import { createAppAsyncThunk } from '../../../utils/create-app-asynk-thunk'

const getCardPacksThunk = createAppAsyncThunk<
  { data: CardPacksResponse },
  Partial<ParamsPacksType>
>(
  'getCardPacks',
  async ({ search: packName, sort: sortPacks, pageCount, page, min, max, user_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      const res = await packsNavigationApi.getPacks({
        page,
        pageCount,
        search: packName,
        sort: sortPacks,
        min,
        max,
        user_id,
      })

      return { data: res.data }
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)
/**
 * create pack and if success get packs again and rerender page
 */
const createPackThunk = createAppAsyncThunk<
  {},
  //this for getCardPacksThunk
  Partial<ParamsPacksType> & {
    //name and deckCover for createPack
    name?: string
    deckCover?: string
  }
>(
  'createPack',
  async (
    { search: packName, sort: sortPacks, min, max, name, deckCover, page, pageCount, user_id },
    thunkAPI
  ) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
      await packsNavigationApi.createPack()
      dispatch(
        packsNavigationThunks.getCardPacksThunk({
          page,
          pageCount,
          search: packName,
          sort: sortPacks,
          min,
          max,
          user_id,
        })
      )

      return {}
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)
/**
 * delete pack and if success get packs again and rerender page
 */
const deletePackThunk = createAppAsyncThunk<{}, Partial<ParamsPacksType> & { packId: string }>(
  'deletePack',
  async (
    { packId, search: packName, sort: sortPacks, pageCount, page, min, max, user_id },
    thunkAPI
  ) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
      await packsNavigationApi.deletePack(packId)
      dispatch(
        packsNavigationThunks.getCardPacksThunk({
          page,
          pageCount,
          search: packName,
          sort: sortPacks,
          min,
          max,
          user_id,
        })
      )

      return {}
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const updatePackThunk = createAppAsyncThunk<
  {},
  //this for getCardPacksThunk
  Partial<ParamsPacksType> & {
    //name and deckCover for createPack
    _id: string
    name: string
  }
>(
  'createPack',
  async (
    { search: packName, sort: sortPacks, min, max, name, _id, page, pageCount, user_id },
    thunkAPI
  ) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
      await packsNavigationApi.updatePack(_id, name)
      dispatch(
        packsNavigationThunks.getCardPacksThunk({
          page,
          pageCount,
          search: packName,
          sort: sortPacks,
          min,
          max,
          user_id,
        })
      )

      return {}
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const initialState: CardPacksResponse = {
  cardPacks: [],
  cardPacksTotalCount: null,
  maxCardsCount: null,
  page: null,
  minCardsCount: null,
  pageCount: null,
  token: null,
  tokenDeathTime: null,
}

export const cardPacksNavigationSlice = createSlice({
  name: 'cardPacks',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCardPacksThunk.fulfilled, (state, action) => {
      return action.payload.data
    })
  },
})

export const packNavigationReducers = cardPacksNavigationSlice.reducer
export const packNavigationActions = cardPacksNavigationSlice.actions
export const packsNavigationThunks = {
  getCardPacksThunk,
  createPackThunk,
  deletePackThunk,
  updatePackThunk,
}
