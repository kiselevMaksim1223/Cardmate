import React, { FC, useState } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { cardsNavigationActions } from '../../../../features/cards/cards-navigation/cards-navigation-slice'
import { packsNavigationThunks } from '../../../../features/cards/packs-navigation/card-packs-navigation-slice'

export const PackActions: FC<{ userId: string; packId: string; cardsCount: number }> = ({
  userId,
  packId,
  cardsCount,
}) => {
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
    dispatch(packsNavigationThunks.deletePackThunk({ packId, params: { ...params } })) //passing params to getPacks after deleting
  }
  const onClickUpdatePack = () => {
    dispatch(
      //passing params to getPacks after updating
      packsNavigationThunks.updatePackThunk({
        _id: packId,
        name: 'new updated name',
        params: { ...params },
      })
    )
  }

  if (redirect) {
    return <Navigate to={'/cards'} />
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '5px' }}>
      <IconButton onClick={onClickStudy} disabled={cardsCount === 0}>
        <SchoolIcon fontSize={'small'} color={cardsCount === 0 ? 'disabled' : 'primary'} />
      </IconButton>
      <IconButton onClick={onClickUpdatePack} sx={{ display: !isMyPack ? 'none' : '' }}>
        <CreateIcon fontSize={'small'} color={'primary'} />
      </IconButton>
      <IconButton onClick={onClickDeletePack} sx={{ display: !isMyPack ? 'none' : '' }}>
        <DeleteIcon fontSize={'small'} color={'primary'} />
      </IconButton>
    </Box>
  )
}
