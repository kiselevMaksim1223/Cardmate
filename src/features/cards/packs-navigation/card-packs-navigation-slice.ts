import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardPacksResponse, packsNavigationApi } from '../../../api/packs-navigation-api'

const getCardPacksThunk = createAsyncThunk<
  { data: CardPacksResponse },
  {
    packName?: string
    sortPacks?: string
    page?: number
    pageCount?: number
    min?: number
    max?: number
  }
>('getCardPacks', async ({ packName, sortPacks, pageCount, page, min, max }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    const res = await packsNavigationApi.getPacks(page, pageCount, packName, sortPacks, min, max)

    return { data: res.data }
  } catch (e) {
    return rejectWithValue('')
  }
})

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
export const packsNavigationThunks = { getCardPacksThunk }