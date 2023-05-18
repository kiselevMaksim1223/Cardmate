import { instance } from './instans-api'

export const packsNavigationApi = {
  getPacks(params: Partial<ParamsPacksType>) {
    return instance.get<CardPacksResponse>('cards/pack', {
      params,
    })
  },
  createPack(name?: string, deckCover?: string) {
    return instance.post('cards/pack', { cardsPack: { name, deckCover } })
  },
  deletePack(packId: string) {
    return instance.delete('cards/pack', { params: { id: packId } })
  },
  updatePack(_id: string, name: string) {
    return instance.put('cards/pack', { cardsPack: { _id, name } })
  },
}

export type ParamsPacksType = {
  page: number
  pageCount: number
  search: string
  sort: string
  min: number
  max: number
  user_id: string
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
