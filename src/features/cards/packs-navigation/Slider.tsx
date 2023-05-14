import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

import { Box, Input, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperRange from '../../../common/components/c7-SuperRange/SuperRange'

import { maxCardsCount, minCardsCount } from './packs-navigation-slice'

export const Slider = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const maxCardsCountServer = useAppSelector(state => state.cardsPacks.maxCardsCount)
  const params = Object.fromEntries(searchParams)
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number | null>(maxCardsCountServer)

  const onChangeHandler = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value === 'object') {
      setValue1(value[0])
      setValue2(value[1])
    }
  }
  const onChangeMax = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value)
    setValue2(value2 as number)
  }
  const onChangeMin = () => {
    setValue1(value1)
  }
  const onChangeCommittedHandler = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    if (typeof value === 'object') {
      // dispatch(minCardsCount(value[0]))
      // dispatch(maxCardsCount(value[1]))
      setSearchParams({ ...params, min: value[0].toString(), max: value[1].toString() })
    }
  }

  useEffect(() => {
    dispatch(maxCardsCount(maxCardsCountServer as number))
    setValue2(maxCardsCountServer)
  }, [maxCardsCountServer])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
      <TextField
        value={value1}
        sx={{ width: '65px' }}
        size={'small'}
        type="number"
        onChange={onChangeMin}
        InputProps={{
          inputProps: {
            min: 0,
            max: 99,
          },
        }}
      />
      <SuperRange
        value={[value1 || +params.min, (value2 as number) || (+params.max as number)]}
        onChange={onChangeHandler}
        onChangeCommitted={onChangeCommittedHandler}
        aria-labelledby="input-slider"
      />
      <TextField
        value={value2}
        sx={{ width: '65px' }}
        size={'small'}
        type="number"
        onChange={onChangeMax}
        InputProps={{
          inputProps: {
            min: 0,
            max: 99,
          },
        }}
      />
    </Box>
  )
}
