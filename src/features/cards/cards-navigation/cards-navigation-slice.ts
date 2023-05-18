import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  CardListResponse,
  cardsNavigationApi,
  CardType,
  createCardType,
  ParamsCardsType,
} from '../../../api/cards-navigation-api'
import { createAppAsyncThunk } from '../../../utils/create-app-asynk-thunk'

const getCardsThunk = createAppAsyncThunk<{ data: CardListResponse }, ParamsCardsType>(
  'getCards',
  async (
    { cardsPack_id, cardAnswer, cardQuestion, min, max, sortCards, page, pageCount },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI

    try {
      const res = await cardsNavigationApi.getCards({
        cardsPack_id,
        cardAnswer,
        cardQuestion,
        min,
        max,
        sortCards,
        page,
        pageCount,
      })

      return { data: res.data }
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

const createCard = createAppAsyncThunk<
  CardType,
  { card: createCardType } & Omit<ParamsCardsType, 'cardsPack_id'>
>(
  'createCard',
  async (
    {
      card: {
        cardsPack_id,
        answer,
        question,
        grade,
        shots,
        answerVideo,
        answerImg,
        questionImg,
        questionVideo,
      },
      //from this for the getCard
      min,
      max,
      sortCards,
      page,
      pageCount,
      cardQuestion,
      cardAnswer,
    },
    thunkAPI
  ) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
      const res = await cardsNavigationApi.createCard({
        cardsPack_id,
        answer,
        question,
      })

      dispatch(
        cardsNavigationThunks.getCardsThunk({
          cardsPack_id,
          cardAnswer,
          cardQuestion,
          min,
          max,
          sortCards,
          page,
          pageCount,
        })
      )

      return { ...res }
    } catch (e) {
      return rejectWithValue(null)
    }
  }
)

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
export const cardsNavigationThunks = { getCardsThunk, createCard }
