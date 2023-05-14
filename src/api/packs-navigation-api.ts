import { instance } from './instans-api'

export const packsNavigationApi = {
  getCardsPack(
    page?: number,
    pageCount?: number,
    search?: string,
    sort?: string,
    min?: number,
    max?: number
  ) {
    return instance.get<CardPacksResponse>('cards/pack', {
      withCredentials: true,
      params: { packName: search, sortPacks: sort, page, pageCount, min, max },
    })
  },
}

export type CardPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type CardPacksResponse = {
  cardPacks: CardPackType[]
  cardPacksTotalCount: number | null
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
  token: string | null
  tokenDeathTime: number | null
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type CardListResponse = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
