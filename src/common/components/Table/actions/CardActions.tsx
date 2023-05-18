import React, { FC } from 'react'

import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import { cardsNavigationThunks } from '../../../../features/cards/cards-navigation/cards-navigation-slice'

export const CardActions: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const onClickUpdateCard = () => {
    dispatch(
      cardsNavigationThunks.updateCard({
        card: { _id: id, question: 'new updated Question' },
        params,
      })
    )
  }
  const onClickDeleteCard = () => {
    dispatch(cardsNavigationThunks.deleteCard({ id, params }))
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={onClickUpdateCard}>
        <CreateIcon fontSize={'small'} color={'primary'} />
      </IconButton>
      <IconButton onClick={onClickDeleteCard}>
        <DeleteIcon fontSize={'small'} color={'primary'} />
      </IconButton>
    </Box>
  )
}
