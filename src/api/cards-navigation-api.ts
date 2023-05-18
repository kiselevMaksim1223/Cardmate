import { instance } from './instans-api'

export const cardsNavigationApi = {
  getCards(params: ParamsCardsType) {
    return instance.get<CardListResponse>('cards/card', {
      params,
    })
  },
  createCard(card: createCardType) {
    return instance.post<createCardType, CardType>('cards/card', { card })
  },
  deleteCard(id: string) {
    return instance.delete('cards/card', { params: { id } })
  },
  updateCard(card: Partial<CardType>) {
    return instance.put('cards/card', { card })
  },
}

export type ParamsCardsType = {
  cardsPack_id?: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type createCardType = {
  cardsPack_id?: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
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
  cardsTotalCount: number | null
  maxGrade: number | null
  minGrade: number | null
  page: number | null
  pageCount: number | null
  packUserId: string | null
}
