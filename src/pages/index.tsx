// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import UsersGraph from 'src/views/dashboard/UsersGraph'
import TopCountries from 'src/views/dashboard/TopCountries'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import React, { useEffect } from 'react'
import Axios from 'src/api'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'

const Dashboard = () => {
  const [stats, setData] = React.useState<any>()
  const [isAuth, setIsAuth] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [value, setValue] = React.useState('1')
  const [value2, setValue2] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
    setValue2(newValue)
  }

  useEffect(() => {
    if (window?.localStorage.getItem('auth') === 'true') {
      setIsAuth(true)
    }

    Axios.get('/dashboard/admin/stats').then(res => {
      setData(res.data)
    })
  }, [])

  return !isAuth ? (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (email === 'admin' && password === 'Password1!') {
            setIsAuth(true)
            window?.localStorage.setItem('auth', 'true')
          }
        }}
      >
        <label>username</label>
        <input type='text' name='username' onChange={e => setEmail(e.target.value)} />
        <label>password</label>
        <input type='password' name='password' onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  ) : (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <StatisticsCard data={stats} />
        </Grid>
        <Grid item xs={12}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='New Users By Time' value='1' />
                <Tab label='Main Funnel' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <UsersGraph data={stats} />
            </TabPanel>
            <TabPanel value='2'>
              <WeeklyOverview data={stats} />
            </TabPanel>
          </TabContext>
        </Grid>
        <Grid item xs={12}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='All Users' value='1' />
                <Tab label='Top Countries' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Table data={stats} />
            </TabPanel>
            <TabPanel value='2'>
              <TopCountries data={stats} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
