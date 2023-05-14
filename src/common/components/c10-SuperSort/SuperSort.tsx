import React from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'

const downIcon = <ExpandMoreIcon sx={{ width: '0.8em', height: '0.8em', paddingTop: '3px' }} />
const upIcon = <ExpandLessIcon sx={{ width: '0.8em', height: '0.8em', paddingTop: '3px' }} />
const noneIcon = <HorizontalRuleIcon sx={{ width: '0.8em', height: '0.8em', paddingTop: '3px' }} />

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  // eslint-disable-next-line no-nested-ternary
  return sort === down ? up : sort == up ? '' : down
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '1' + value
  const down = '0' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  // eslint-disable-next-line no-nested-ternary
  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      {icon}
    </span>
  )
}

export default SuperSort
