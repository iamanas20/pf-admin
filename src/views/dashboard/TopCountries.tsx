'use client'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { CardHeader } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

const TopCountries = ({ data }: any) => {
  const [countries, setCountries] = useState<any[]>([])
  useEffect(() => {
    import('../../countries.json').then(data => {
      setCountries(data.default as any)
    })
  }, [])

  const countryCounts = useMemo(
    () =>
      data?.usersData?.reduce((counts: any, user: any) => {
        counts[user.country] = (counts[user.country] || 0) + 1
        return counts
      }, {}),
    [data?.usersData]
  )

  // @ts-ignore
  const sortedCountries = Object.entries(countryCounts || []).sort((a, b) => b[1] - a[1])

  return (
    <Card>
      <CardHeader
        title='Top Countries'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Number of users</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCountries.map(([country, count]: any) => {
              return (
                <TableRow hover key={country} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    {country && countries[country]
                      ? countries[country]?.name + ' ' + countries[country]?.emoji
                      : 'Unknown'}
                  </TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              )
            })}
            {/* {data?.usersData?.map((user: any) => {
              return (
                <TableRow hover key={user._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>
                    <a href={`https://${user.subdomain}.pocketsflow.com`} target='_blank'>
                      {user.subdomain}
                    </a>
                  </TableCell>
                </TableRow>
              )
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TopCountries
