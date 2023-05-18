import React, { FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import SuperPagination from '../../../../common/components/c9-SuperPagination/SuperPagination'

type PaginationType = {
  page: number | null
  pageCount: number | null
  totalCount: number | null
}

export const Pagination: FC<PaginationType> = ({ page, pageCount, totalCount }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const onChangeHandler = (newPage: number, newCount: number) => {
    setSearchParams({ ...params, page: newPage.toString(), pageCount: newCount.toString() })
  }

  return (
    <>
      <SuperPagination
        itemsCountForPage={pageCount as number}
        totalCount={totalCount as number}
        page={page as number}
        onChange={onChangeHandler}
        isLoading={false}
      />
    </>
  )
}
