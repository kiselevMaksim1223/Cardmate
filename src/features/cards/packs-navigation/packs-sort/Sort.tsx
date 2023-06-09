import React, { FC, memo, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import SuperSort from '../../../../common/components/c10-SuperSort/SuperSort'

type SortType = {
  sort_by: string
  sort_of: 'packs' | 'cards'
}

export const Sort: FC<SortType> = memo(({ sort_by, sort_of }) => {
  const [sort, setSort] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const onChangeHandler = (newSort: string) => {
    setSort(newSort)
    // заключая в квадратные скобки мы говорим какое имя свойства нам нужно исходя из проверки
    setSearchParams({ ...params, [`${sort_of === 'packs' ? 'sortPacks' : 'sortCards'}`]: newSort })
  }

  useEffect(() => {
    if (Object.keys(params).includes('sortPacks' || 'sortCards')) {
      setSort(params[`${sort_of === 'packs' ? 'sortPacks' : 'sortCards'}`])
    }
  }, [])

  return (
    <>
      <SuperSort sort={sort} value={sort_by} onChange={onChangeHandler} id={`${sort_by}-sortId`} />
    </>
  )
})
