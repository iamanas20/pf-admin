'use client'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { CardHeader } from '@mui/material'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const DashboardTable = ({ data }: any) => {
  console.log(data)
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Stripe account</TableCell>
              <TableCell>PayPal merchant</TableCell>
              <TableCell>Referrer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.usersData?.map((user: any) => {
              const referral = user?.referral ?? ''
              const products = data?.productsData?.filter((product: any) => product.userId === user.userId) || []
              const sales = data?.salesData?.filter((sale: any) => sale.userId === user.userId) || []
              return (
                <TableRow hover key={user._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
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
                      <Typography variant='body2' className='font-weight-bold ms-50'>
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{products.length}</TableCell>
                  <TableCell>{sales.length}</TableCell>
                  <TableCell>{user.stripeConnectedAccountId}</TableCell>
                  <TableCell>{user.merchantIdInPayPal}</TableCell>
                  <TableCell>{referral}</TableCell>
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
