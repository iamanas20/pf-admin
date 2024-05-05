// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { MenuItem, Select } from '@mui/material'

const WeeklyOverview = ({ data }: any) => {
  const theme = useTheme()
  const [duration, setDuration] = useState<number>(30)

  const [userCreationData, setUserCreationData] = useState<any>({})

  useEffect(() => {
    if (data?.usersData) {
      // Initialize labels with the last 30 days' dates
      const labels: any = []
      console.log(duration)
      const dataPoints = new Array(duration).fill(0)

      for (let i = duration - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        labels.push(date.toISOString().split('T')[0])
      }

      // Populate data points based on fetched data
      data.usersData.forEach((user: any) => {
        const createdAt = new Date(user.createdAt)
        const dateString = createdAt.toISOString().split('T')[0] // Get date string (YYYY-MM-DD)
        const index = labels.indexOf(dateString)
        if (index !== -1) {
          dataPoints[index]++
        }
      })

      // Set the data for the chart
      setUserCreationData({
        options: {
          chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
          },
          plotOptions: {
            bar: {
              borderRadius: 9,
              distributed: true,
              // columnWidth: '40%',
              // endingShape: 'rounded',
              startingShape: 'rounded'
            }
          },
          stroke: {
            width: 2,
            colors: [theme.palette.primary.main]
          },
          legend: { show: false },
          grid: {
            strokeDashArray: 7,
            padding: {
              top: -1,
              right: 0,
              left: -12,
              bottom: 5
            }
          },
          dataLabels: { enabled: false },
          colors: [
            theme.palette.primary.main,
            theme.palette.primary.main,
            theme.palette.primary.main,
            theme.palette.primary.main,
            theme.palette.primary.main,
            theme.palette.primary.main
          ],
          states: {
            hover: {
              filter: { type: 'none' }
            },
            active: {
              filter: { type: 'none' }
            }
          },
          xaxis: {
            categories: labels,
            tickPlacement: 'on',
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false }
          },
          yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
              offsetX: -17
            }
          }
        },
        series: [
          {
            name: 'User Creation',
            data: dataPoints
          }
        ]
      })
    }
  }, [data?.usersData, duration])

  const handleDurationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDuration(event.target.value as number)
  }

  return (
    <Card>
      <CardHeader
        title='User signups'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <Select value={duration} onChange={(ev: any) => handleDurationChange(ev)} variant='outlined' sx={{ ml: 1 }}>
            <MenuItem value={7}>7 days</MenuItem>
            <MenuItem value={15}>15 days</MenuItem>
            <MenuItem value={30}>30 days</MenuItem>
            <MenuItem value={90}>90 days</MenuItem>
            <MenuItem value={365}>365 days</MenuItem>
          </Select>
        }
      />
      <CardContent>
        {userCreationData?.series && (
          <ReactApexcharts
            type='bar'
            height={405}
            options={userCreationData?.options}
            series={userCreationData?.series}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
