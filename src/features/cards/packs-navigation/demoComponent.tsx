import React, { useEffect } from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { TableComponent } from '../Table'

import { packsNavigationThunks } from './card-packs-navigation-slice'
import { Pagination } from './packs-pagination/Pagination'
import { Search } from './packs-search/Search'
import { Slider } from './Slider'

export const DemoComponent = () => {
  const dispatch = useAppDispatch()
  const { cardPacks } = useAppSelector(state => state.cardsPacks)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    if (params) {
      dispatch(packsNavigationThunks.getCardPacksThunk({ ...params }))
    }
  }, [searchParams])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Search />
        <Slider />
      </Box>
      <TableComponent tableType={'Packs'} tablePackData={cardPacks} />
      <Pagination />
    </>
  )
}
