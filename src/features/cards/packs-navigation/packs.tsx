import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { TableComponent } from '../../../common/components/Table/Table'

import { packsNavigationThunks } from './card-packs-navigation-slice'
import { Pagination } from './packs-pagination/Pagination'
import { Search } from './packs-search/Search'
import { Slider } from './packs-slider/Slider'
import { PacksToggleButton } from './packs-toggleButton/PacksToggleButton'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const { cardPacks, page, pageCount, cardPacksTotalCount } = useAppSelector(
    state => state.cardsPacks
  )
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const onClickAddPack = () => {
    dispatch(packsNavigationThunks.createPackThunk({ ...params }))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  useEffect(() => {
    dispatch(packsNavigationThunks.getCardPacksThunk({ ...params }))
  }, [searchParams])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Typography variant={'h3'}>Packs list</Typography>
        <SuperButton
          onClick={onClickAddPack}
          style={{
            borderRadius: '30px',
            padding: '17px 0',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Add new pack
        </SuperButton>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', width: '100%' }}>
        <Search search_in={'packs'} />
        <PacksToggleButton />
        <Slider />
      </Box>
      {!cardPacks.length ? (
        <Typography sx={{ marginTop: '30px', color: 'rgba(0, 0, 0, 0.5)' }}>
          Packs not found...
        </Typography>
      ) : (
        <>
          <TableComponent tableType={'Packs'} tablePackData={cardPacks} />
          <Pagination page={page} pageCount={pageCount} totalCount={cardPacksTotalCount} />
        </>
      )}
    </>
  )
}
