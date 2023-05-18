import React, { FC, memo } from 'react'

import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import SuperDebouncedInput from '../../../../common/components/c8-SuperDebouncedInput/SuperDebouncedInput'

type SearchType = {
  search_in: 'packs' | 'cards'
}

export const Search: FC<SearchType> = memo(({ search_in }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams)

  const onDebounceHandler = (searchParam: string) => {
    setSearchParams({
      ...params,
      //// заключая в квадратные скобки мы говорим какое имя свойства нам нужно исходя из проверки
      [`${search_in === 'packs' ? 'packName' : 'cardQuestion'}`]: searchParam,
    })
  }

  return (
    <Box sx={{ textAlign: 'start', width: '100%' }}>
      <Typography>Search</Typography>
      <SuperDebouncedInput onDebouncedChange={onDebounceHandler} />
    </Box>
  )
})
