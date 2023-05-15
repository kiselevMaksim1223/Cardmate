import React, { ChangeEvent, useEffect, useState } from 'react'

import { Box, TextField, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../../app/store'
import SuperRange from '../../../../common/components/c7-SuperRange/SuperRange'

export const Slider = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const maxCardsCountServer = useAppSelector(state => state.cardsPacks.maxCardsCount)
  const params = Object.fromEntries(searchParams)
  const [value1, setValue1] = useState<number>(+params.min ? +params.min : 0)
  const [value2, setValue2] = useState<number | null>(
    +params.max ? +params.max : maxCardsCountServer
  )

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

  /**
   checking for params.max, if no params and maxCardsCount changed set maxCardsCount as default
   because maxCardsCountServer equal null
   */
  useEffect(() => {
    if (params.max) {
      return
    }
    setValue2(maxCardsCountServer)
  }, [maxCardsCountServer])

  return (
    <Box>
      <Typography sx={{ display: 'block', textAlign: 'left' }}>Number of cards</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
        <TextField
          value={value1}
          sx={{ width: '65px', fontSize: '25px' }}
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
          value={[value1, value2 as number]}
          // value={[+params.min ? +params.min : value1, +params.max ? +params.max : (value2 as number)]}
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
    </Box>
  )
}
