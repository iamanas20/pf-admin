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
import { useEffect, useState } from 'react'

const DashboardTable = ({ data }: any) => {
  const [countries, setCountries] = useState<any[]>([])
  useEffect(() => {
    import('../../countries.json').then(data => {
      setCountries(data.default as any)
    })
  }, [])

  return (
    <Card>
      <CardHeader
        title='Users'
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
              <TableCell>ID</TableCell>
              <TableCell>Subdomain</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Stripe account</TableCell>
              <TableCell>PayPal merchant</TableCell>
              <TableCell>Hear about us</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.usersData?.map((user: any) => {
              const products = data?.productsData?.filter((product: any) => product.userId === user.userId) || []
              const sales = data?.salesData?.filter((sale: any) => sale.userId === user.userId) || []
              return (
                <TableRow hover key={user._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>
                    <a href={`https://${user.subdomain}.pocketsflow.com`} target='_blank'>
                      {user.subdomain}
                    </a>
                  </TableCell>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }} width={'300px'}>
                    <Box display='flex' alignItems='center' gap={3}>
                      <img
                        src={user.picture}
                        alt='user avatar'
                        width='28'
                        height='28'
                        style={{
                          borderRadius: '50%'
                        }}
                      />
                      <Typography variant='body2' className='font-weight-bold ms-50' style={{ whiteSpace: 'nowrap' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography
                        variant='body2'
                        className='font-weight-bold ms-50'
                        title={countries[user.country]?.name}
                      >
                        {user.country} {countries[user.country]?.emoji}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{products.length}</TableCell>
                  <TableCell>{sales.length}</TableCell>
                  <TableCell>
                    <a
                      href={`https://dashboard.stripe.com/connect/accounts/${user.stripeConnectedAccountId}`}
                      target='_blank'
                    >
                      {user.stripeConnectedAccountId}
                    </a>
                  </TableCell>
                  <TableCell>{user.merchantIdInPayPal}</TableCell>
                  <TableCell>{user.hearAboutUs}</TableCell>
                  {/* <TableCell>{user?.referral || ''}</TableCell> */}
                  {/* <TableCell>{row.salary}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
