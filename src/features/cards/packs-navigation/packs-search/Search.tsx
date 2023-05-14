import React from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import SuperDebouncedInput from '../../../../common/components/c8-SuperDebouncedInput/SuperDebouncedInput'
import { searchResult } from '../card-packs-navigation-slice'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const params = Object.fromEntries(searchParams)

  const onDebounceHandler = (searchParam: string) => {
    dispatch(searchResult(searchParam))
    setSearchParams({ ...params, packName: searchParam })
  }

  return (
    <Box sx={{ textAlign: 'start' }}>
      <Typography>Search</Typography>
      <SuperDebouncedInput onDebouncedChange={onDebounceHandler} />
    </Box>
  )
}
