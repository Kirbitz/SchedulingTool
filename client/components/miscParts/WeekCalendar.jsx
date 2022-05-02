import React from 'react'
import PropTypes from 'prop-types'

import { getEmployeeList } from '../../dataHelper.js'

import ShiftCard from './ShiftCard'

import { Box, Divider, Typography } from '@mui/material'

export default function WeekCalendar (props) {
  const shiftTimesStandard = ['7:30am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:15pm', '2:30pm', '3:30pm', '4:30pm']
  const shiftTimes = ['7:30am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:15pm', '2:30pm', '3:30pm', '4:30pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm']
  const sundayShiftTimes = ['12:00pm', '2:30pm', '5:00pm', '7:30pm', '10:00pm']
  const saturdayShiftTimes = ['10:00am', '12:00pm', '2:00pm']
  const weekNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const [employees, setEmployees] = React.useState([])

  const getEmployeeData = () => {
    getEmployeeList()
      .then((response) => {
        if (response.data) {
          const employeesArray = []
          response.data.forEach((employee) => {
            employeesArray.push({
              label: employee.name,
              id: employee.id
            })
          })
          setEmployees(employeesArray)
        }
      })
  }

  React.useEffect(() => {
    getEmployeeData()
  }, [])

  const { previewToggle, schedulePos } = props

  const weekdayStandardCards = []
  const weekdayLongCards = []
  const sundayCards = []
  const saturdayCards = []

  for (let index = 0; index < shiftTimesStandard.length - 1; index++) {
    weekdayStandardCards.push(<ShiftCard
                                key={index}
                                previewToggle={previewToggle}
                                schedulePos={schedulePos}
                                startTime={shiftTimesStandard[index]}
                                endTime={shiftTimesStandard[index + 1]}
                                employees={employees}
                              />)
  }

  if (schedulePos === 0) {
    for (let index = 0; index < shiftTimes.length - 1; index++) {
      weekdayLongCards.push(<ShiftCard
                              key={index + 20}
                              previewToggle={previewToggle}
                              schedulePos={schedulePos}
                              startTime={shiftTimes[index]}
                              endTime={shiftTimes[index + 1]}
                              employees={employees}
                            />)
    }

    for (let index = 0; index < sundayShiftTimes.length - 1; index++) {
      sundayCards.push(<ShiftCard
                          key={index + 40}
                          previewToggle={previewToggle}
                          schedulePos={schedulePos}
                          startTime={sundayShiftTimes[index]}
                          endTime={sundayShiftTimes[index + 1]}
                          employees={employees}
                        />)
    }

    for (let index = 0; index < saturdayShiftTimes.length - 1; index++) {
      saturdayCards.push(<ShiftCard
                            key={index + 60}
                            previewToggle={previewToggle}
                            schedulePos={schedulePos}
                            startTime={sundayShiftTimes[index]}
                            endTime={sundayShiftTimes[index + 1]}
                            employees={employees}
                          />)
    }
  }

  return (
    <Box justifyContent='center' display='flex' sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '14%' }}>
        <Typography variant='h5' component='div' align='center'>
          Sunday
        </Typography>
        <Divider />
        {sundayCards}
      </Box>
      <Divider orientation='vertical' flexItem />
      {weekNames.map((name, index) => (
        <React.Fragment key={index}>
          {index === 0 ? <div></div> : <Divider orientation='vertical' flexItem />}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '14%' }}>
            <Typography variant='h5' component='div' align='center'>
              {name}
            </Typography>
            <Divider />
            {index !== weekNames.length - 1 && schedulePos === 0 ? weekdayLongCards : weekdayStandardCards}
          </Box>
        </React.Fragment>
      ))}
      <Divider orientation='vertical' flexItem />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '14%' }}>
        <Typography variant='h5' component='div' align='center'>
          Saturday
        </Typography>
        <Divider />
        {saturdayCards}
      </Box>
    </Box>
  )
}

WeekCalendar.propTypes = {
  schedulePos: PropTypes.number.isRequired,
  previewToggle: PropTypes.bool.isRequired
}
