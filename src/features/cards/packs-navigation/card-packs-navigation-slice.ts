import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardPacksResponse, packsNavigationApi } from '../../../api/packs-navigation-api'
import { createAppAsyncThunk } from '../../../utils/create-app-asynk-thunk'

const getCardPacksThunk = createAppAsyncThunk<
  { data: CardPacksResponse },
  {
    packName?: string
    sortPacks?: string
    page?: number
    pageCount?: number
    min?: number
    max?: number
    user_id?: string
  }
>('getCardPacks', async ({ packName, sortPacks, pageCount, page, min, max, user_id }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    const res = await packsNavigationApi.getPacks(
      page,
      pageCount,
      packName,
      sortPacks,
      min,
      max,
      user_id
    )

    return { data: res.data }
  } catch (e) {
    return rejectWithValue(null)
  }
})

const createPackThunk = createAppAsyncThunk<{}, { name?: string; deckCover?: string }>(
  'createPack',
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      await packsNavigationApi.createPack()

      return {}
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const initialState: CardPacksResponse & {
  newPage?: number
  newCountPage?: number
  searchResult?: string
  sortResult?: string
  min?: number
  max?: number
} = {
  cardPacks: [],
  cardPacksTotalCount: null,
  maxCardsCount: null,
  page: null,
  minCardsCount: null,
  pageCount: null,
  token: null,
  tokenDeathTime: null,
  newPage: 1,
  newCountPage: 4,
  searchResult: '',
  sortResult: '',
}

export const cardPacksNavigationSlice = createSlice({
  name: 'cardPacks',
  initialState: initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.newPage = action.payload
    },
    changePageCount: (state, action: PayloadAction<number>) => {
      state.newCountPage = action.payload
    },
    searchResult: (state, action: PayloadAction<string>) => {
      state.searchResult = action.payload
    },
    sortResult: (state, action: PayloadAction<string>) => {
      state.sortResult = action.payload
    },
    minCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
    },
    maxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getCardPacksThunk.fulfilled, (state, action) => {
      return action.payload.data
    })
  },
})

export const packNavigationReducers = cardPacksNavigationSlice.reducer
export const {
  changePage,
  changePageCount,
  sortResult,
  searchResult,
  minCardsCount,
  maxCardsCount,
} = cardPacksNavigationSlice.actions
export const packsNavigationThunks = { getCardPacksThunk, createPackThunk }
