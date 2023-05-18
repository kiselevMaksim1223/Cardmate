import React, { FC, useState } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import { Box } from '@mui/material'
import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { cardsNavigationActions } from '../../../../features/cards/cards-navigation/cards-navigation-slice'
import { packsNavigationThunks } from '../../../../features/cards/packs-navigation/card-packs-navigation-slice'

export const Actions: FC<{ userId: string; packId: string }> = ({ userId, packId }) => {
  const dispatch = useAppDispatch()
  const myUserId = useAppSelector(state => state.auth.dataForProfilePage._id)
  const isMyPack = userId === myUserId
  const [redirect, setRedirect] = useState(false)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const onClickStudy = () => {
    dispatch(cardsNavigationActions.packId({ packId }))
    setRedirect(true)
  }
  const onClickDeletePack = () => {
    dispatch(packsNavigationThunks.deletePackThunk({ packId, ...params })) //passing params to getPacks after deleting
  }

  if (redirect) {
    return <Navigate to={'/cards'} />
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
      <SchoolIcon fontSize={'small'} onClick={onClickStudy} />
      <CreateIcon fontSize={'small'} sx={{ display: !isMyPack ? 'none' : '' }} />
      <DeleteIcon
        fontSize={'small'}
        onClick={onClickDeletePack}
        sx={{ display: !isMyPack ? 'none' : '' }}
      />
    </Box>
  )
}
