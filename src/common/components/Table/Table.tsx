import React, { FC } from 'react'

import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material'

import { CardPackType, CardType } from '../../../api/packs-navigation-api'
import { Sort } from '../../../features/cards/packs-navigation/packs-sort/Sort'
import { formattedDate } from '../../../utils/formattedDate'

import { Actions } from './actions/Actions'

type TableProps = {
  tablePackData?: CardPackType[]
  tableCardsData?: CardType[]
  tableType: 'Packs' | 'Cards' // for table versatility (packs or cards table)
}

export const TableComponent: FC<TableProps> = ({ tablePackData, tableCardsData, tableType }) => {
  //arrays for creating tablehead rows
  const packs = [
    { title: 'Name', sort: { isSorted: true, sortTitle: 'name' } },
    { title: 'Cards', sort: { isSorted: true, sortTitle: 'cardsCount' } },
    { title: 'Last Updated', sort: { isSorted: true, sortTitle: 'updated' } },
    { title: 'Created by', sort: { isSorted: false, sortTitle: '' } },
    { title: 'Actions', sort: { isSorted: false, sortTitle: '' } },
  ]
  const cards = [
    { title: 'Question', sort: { isSorted: false, sortTitle: 'question' } },
    { title: 'Answer', sort: { isSorted: false, sortTitle: 'answer' } },
    { title: 'Last Updated', sort: { isSorted: true, sortTitle: 'updated' } },
    { title: 'Grade', sort: { isSorted: false, sortTitle: 'grade' } },
  ]

  return (
    <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
      <Table aria-label="table">
        <TableHead sx={{ background: '#EFEFEF', '& th': { width: '200px' } }}>
          <TableRow>
            {(tableType === 'Packs' ? packs : cards).map((cell, index) => (
              <TableCell key={index} align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <span>{cell.title}</span>
                  {cell.sort.isSorted && (
                    <Sort
                      sort_of={tableType === 'Packs' ? 'packs' : 'cards'}
                      sort_by={cell.sort.sortTitle}
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableType === 'Packs'
            ? (tablePackData as CardPackType[]).map(
                ({ _id, name, cardsCount, updated, user_name, user_id }) => (
                  <TableRow
                    key={_id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& td': { width: '200px' },
                    }}
                  >
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{cardsCount}</TableCell>
                    <TableCell align="center">{formattedDate(updated)}</TableCell>
                    <TableCell align="center">{user_name}</TableCell>
                    <TableCell align="center">
                      <Actions userId={user_id} />
                    </TableCell>
                  </TableRow>
                )
              )
            : (tableCardsData as CardType[]).map(row => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.question}</TableCell>
                  <TableCell align="center">{row.answer}</TableCell>
                  <TableCell align="center">{row.updated}</TableCell>
                  <TableCell align="center">{row.grade}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
