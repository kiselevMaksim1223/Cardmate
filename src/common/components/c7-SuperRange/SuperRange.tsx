import React from 'react'

import { Slider, SliderProps } from '@mui/material'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      sx={{
        width: 147,
        height: 4,
        color: '#01CB22',
        // стили для слайдера
      }}
      //
      min={(props.value as number[])[0]}
      max={(props.value as number[])[1]}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange
