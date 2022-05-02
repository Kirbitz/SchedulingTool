import React from 'react'
import PropTypes from 'prop-types'
import { getEmployeeList } from '../dataHelper.js'

import { Grid, Paper, Tabs, Tab, Typography } from '@mui/material'

import EmployeeCard from './EmployeeCard.jsx'
import TabPanel from './miscParts/TabPanel.jsx'

export default function EmployeeGrid (props) {
  const { previewToggle, onClickCallback } = props

  const [employeeSummary, setEmployeeSummary] = React.useState(null)
  const [tabPos, setTabPos] = React.useState(0)

  const tabColors = ['#2e88db', 'green', 'orange', 'purple']

  const updateEmployeeData = () => {
    getEmployeeList()
      .then((response) => { setEmployeeSummary(response.data) })
      .catch((err) => {
        alert('Failed to retrieve data')
        console.error(err)
      })
  }

  const handleChange = (event, newTabPos) => {
    if (newTabPos !== tabPos) {
      setTabPos(newTabPos)
    }
  }

  React.useEffect(() => {
    updateEmployeeData()
  }, [])

  if (!Array.isArray(employeeSummary) || employeeSummary.length < 1) {
    return (
      <Grid>
        <p>Loading ...</p>
      </Grid>
    )
  }

  const employeeCards = employeeSummary.map((employee) => {
    return <EmployeeCard key={employee.id} employee={employee} previewToggle={previewToggle} onClickCallback={onClickCallback} />
  })

  const locationEmployeeCards = (location) => {
    return employeeSummary.map((employee) => {
      if (Object.values(employee.locations).includes(location)) {
        return <EmployeeCard key={employee.id} employee={employee} previewToggle={previewToggle} onClickCallback={onClickCallback} />
      }
      return <div key={employee.id}></div>
    })
  }

  return (
    <React.Fragment>
      <Typography variant='h3' component='div' align='center' sx={{ mb: 2 }}>
        Employees
      </Typography>
      <Paper elevation={2}>
        <Tabs
          value={tabPos}
          onChange={handleChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: tabColors[tabPos] } }}
          textColor='inherit'
          variant='fullWidth'
          aria-label='Employee areas tabs'
        >
          <Tab label='All Locations' sx={{ color: '#2e88db' }} />
          <Tab label='Walkup' sx={{ color: 'green' }} />
          <Tab label='QA' sx={{ color: 'orange' }} />
          <Tab label='PC Repair' sx={{ color: 'purple' }} />
        </Tabs>
      </Paper>
      <TabPanel value={tabPos} index={0}>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          {employeeCards}
        </Grid>
      </TabPanel>
      <TabPanel value={tabPos} index={1}>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          {locationEmployeeCards('Walkup')}
        </Grid>
      </TabPanel>
      <TabPanel value={tabPos} index={2}>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          {locationEmployeeCards('QA')}
        </Grid>
      </TabPanel>
      <TabPanel value={tabPos} index={3}>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          {locationEmployeeCards('PC Repair')}
        </Grid>
      </TabPanel>
    </React.Fragment>
  )
}

EmployeeGrid.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  onClickCallback: PropTypes.func
}

EmployeeGrid.defaultProps = {
  onClickCallback: null
}
