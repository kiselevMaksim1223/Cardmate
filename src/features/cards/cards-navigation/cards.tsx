import React, { useEffect } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Box, Typography } from '@mui/material'
import { useSearchParams, Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { TableComponent } from '../../../common/components/Table/Table'
import { Pagination } from '../packs-navigation/packs-pagination/Pagination'
import { Search } from '../packs-navigation/packs-search/Search'

import { cardsNavigationThunks } from './cards-navigation-slice'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const { cards, page, pageCount, cardsTotalCount, packId, packUserId } = useAppSelector(
    state => state.cards
  )
  const userId = useAppSelector(state => state.auth.dataForProfilePage._id)
  const [searchParams, setSearchParams] = useSearchParams()
  const isMyPack = userId === packUserId
  const params = Object.fromEntries(searchParams)

  const onClickAddCard = () => {
    dispatch(
      cardsNavigationThunks.createCard({
        card: {
          cardsPack_id: params['cardsPack_id'],
          question: 'new question',
          answer: 'new Answer',
        },
        ...params,
      })
    )
  }

  //set query params in URL on first render
  useEffect(() => {
    setSearchParams({ cardsPack_id: packId as string })
  }, [])

  useEffect(() => {
    //checking if there is query params in url, it necessary for prevent empty request without cardsPack_id
    if (Object.keys(params).length) {
      dispatch(
        cardsNavigationThunks.getCardsThunk({ ...params, cardsPack_id: params['cardsPack_id'] })
      )
    }
  }, [searchParams])

  return (
    <>
      <Box
        sx={{
          width: '100%',
          marginBottom: '40px',
          '& a': { float: 'left', textDecoration: 'none', color: 'inherit' },
        }}
      >
        <Link to={'/packs'}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <KeyboardBackspaceIcon />
            <span>Back to Packs List</span>
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Typography variant={'h3'}>{isMyPack ? 'My pack' : 'Friend’s Pack'}</Typography>
        {isMyPack ? (
          <SuperButton
            onClick={onClickAddCard}
            style={{
              borderRadius: '30px',
              padding: '17px 0',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: `${cards.length ? '' : 'none'}`,
            }}
          >
            Add new card
          </SuperButton>
        ) : (
          <SuperButton
            // onClick={onClickLearnPack}
            style={{
              borderRadius: '30px',
              padding: '17px 0',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Learn to pack
          </SuperButton>
        )}
      </Box>
      {cards.length ? (
        <Box sx={{ width: '100%' }}>
          <Search search_in={'cards'} />
          <TableComponent tableType={'Cards'} tableCardsData={cards} />
          <Pagination page={page} pageCount={pageCount} totalCount={cardsTotalCount} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '60px',
          }}
        >
          <Typography sx={{ opacity: '0.5' }}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <SuperButton
            onClick={onClickAddCard}
            style={{
              borderRadius: '30px',
              padding: '17px 0',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Add new card
          </SuperButton>
        </Box>
      )}
    </>
  )
}
