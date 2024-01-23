// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import React, { useEffect } from 'react'
import Axios from 'src/api'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

const Dashboard = () => {
  const [stats, setData] = React.useState<any>()
  const [isAuth, setIsAuth] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

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
          <WeeklyOverview data={stats} />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <TotalEarning data={stats} />
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
        <Grid item xs={12}>
          <Table data={stats} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
