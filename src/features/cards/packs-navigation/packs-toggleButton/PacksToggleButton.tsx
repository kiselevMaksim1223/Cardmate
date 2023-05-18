import React, { useState } from 'react'

import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../../app/store'

export const PacksToggleButton = () => {
  const userId = useAppSelector(state => state.auth.dataForProfilePage._id)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const [alignment, setAlignment] = useState(`${params[`user_id`] ? 'my' : 'all'}`)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  const onClickMyPack = () => {
    setSearchParams({ ...params, user_id: userId as string })
  }

  const onClickAllPack = () => {
    setSearchParams({ ...params, user_id: '' })
  }

  return (
    <Box sx={{ textAlign: 'start' }}>
      <Typography>Show packs cards</Typography>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ height: '40px', '& button': { width: '67px' } }}
      >
        <ToggleButton value="my" onClick={onClickMyPack}>
          My
        </ToggleButton>
        <ToggleButton value="all" onClick={onClickAllPack}>
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
