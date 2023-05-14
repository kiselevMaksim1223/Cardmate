import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { TableComponent } from '../Table'

import { packsNavigationThunks } from './packs-navigation-slice'
import { Pagination } from './packs-pagination/Pagination'
import { Search } from './packs-search/Search'
import { Sort } from './packs-sort/Sort'
import { Slider } from './Slider'

export const DemoComponent = () => {
  const dispatch = useAppDispatch()
  const { cardPacks } = useAppSelector(state => state.cardsPacks)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    if (params) {
      dispatch(packsNavigationThunks.getCardsPackThunk({ ...params }))
    }
  }, [searchParams])

  return (
    <>
      <Search />
      <Slider />
      <TableComponent tableType={'Packs'} tablePackData={cardPacks} />
      <Pagination />
    </>
  )
}
