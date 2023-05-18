import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  CardListResponse,
  cardsNavigationApi,
  CardType,
  createCardType,
  ParamsCardsType,
} from '../../../api/cards-navigation-api'
import { createAppAsyncThunk } from '../../../utils/create-app-asynk-thunk'

const getCardsThunk = createAppAsyncThunk<{ data: CardListResponse }, { params: ParamsCardsType }>(
  'getCards',
  async ({ params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
      const res = await cardsNavigationApi.getCards(params)

      return { data: res.data }
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const createCard = createAppAsyncThunk<
  CardType,
  { card: createCardType } & { params: ParamsCardsType }
>('createCard', async ({ card, params }, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await cardsNavigationApi.createCard(card)

    dispatch(cardsNavigationThunks.getCardsThunk({ params }))

    return { ...res }
  } catch (e) {
    return rejectWithValue(null)
  }
})

const deleteCard = createAppAsyncThunk<{}, { id: string } & { params: ParamsCardsType }>(
  'createCard',
  async ({ id, params }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
      const res = await cardsNavigationApi.deleteCard(id)

      dispatch(cardsNavigationThunks.getCardsThunk({ params }))

      return {}
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const updateCard = createAppAsyncThunk<
  {},
  { card: Partial<CardType> } & { params: ParamsCardsType }
>('createCard', async ({ card, params }, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await cardsNavigationApi.updateCard(card)

    dispatch(cardsNavigationThunks.getCardsThunk({ params }))

    return {}
  } catch (e) {
    return rejectWithValue(null)
  }
})

const initialState: CardListResponse & { packId?: string } = {
  cards: [],
  cardsTotalCount: null,
  maxGrade: null,
  minGrade: null,
  page: null,
  pageCount: null,
  packUserId: '',
  packId: '',
}

export const cardsNavigationSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    packId: (state, action: PayloadAction<{ packId: string }>) => {
      state.packId = action.payload.packId
    },
  },
  extraReducers: builder => {
    builder.addCase(getCardsThunk.fulfilled, (state, action) => {
      return action.payload.data
    })
  },
})

export const cardsNavigationReducers = cardsNavigationSlice.reducer
export const cardsNavigationActions = cardsNavigationSlice.actions
export const cardsNavigationThunks = { getCardsThunk, createCard, deleteCard, updateCard }
