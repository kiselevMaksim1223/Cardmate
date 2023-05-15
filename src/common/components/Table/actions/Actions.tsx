import React, { FC } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import { Box } from '@mui/material'

import { useAppSelector } from '../../../../app/store'

export const Actions: FC<{ userId: string }> = ({ userId }) => {
  const myUserId = useAppSelector(state => state.auth.dataForProfilePage._id)
  const isMyPack = userId === myUserId

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
      <SchoolIcon fontSize={'small'} />
      <CreateIcon fontSize={'small'} sx={{ display: !isMyPack ? 'none' : '' }} />
      <DeleteIcon fontSize={'small'} sx={{ display: !isMyPack ? 'none' : '' }} />
    </Box>
  )
}
