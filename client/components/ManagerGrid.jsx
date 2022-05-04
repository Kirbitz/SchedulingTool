import React from 'react'
import PropTypes from 'prop-types'
import { getEmployeeList } from '../dataHelper.js'

import { Grid, Typography } from '@mui/material'

import EmployeeCard from './EmployeeCard.jsx'

export default function ManagerGrid (props) {
  // Destructor props into previewToggle and onClickCallback
  const { previewToggle, onClickCallback } = props

  // Hooks for grabbing manager data from getEmployeeList
  const [managerSummary, setManagerSummary] = React.useState(null)

  // function to grab manager data and store it into managerSummary
  const updateManagerData = () => {
    getEmployeeList()
      .then((response) => { setManagerSummary(response.data.filter((employee) => { return (employee.locations['1949304']) })) })
      .catch((err) => {
        alert('Failed to retrieve data')
        console.error(err)
      })
  }

  // Uses effect upon first mounting of this component
  React.useEffect(() => {
    updateManagerData()
  }, [])

  // Checks if data is in managerSummary
  if (!Array.isArray(managerSummary) || managerSummary.length < 1) {
    return (
      <Grid>
        <p>Loading ...</p>
      </Grid>
    )
  }

  // Creates manager cards
  const managerCards = managerSummary.map((manager) => {
    return <EmployeeCard key={manager.id} employee={manager} previewToggle={previewToggle} onClickCallback={onClickCallback} isManager />
  })

  return (
    <React.Fragment>
      <Typography variant='h3' component='div' align='center' sx={{ mt: 2 }}>
        Managers
      </Typography>
      {/* Grid of manager cards */}
      <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
        {managerCards}
      </Grid>
    </React.Fragment>
  )
}

// Prop validation for ManagerGrid
ManagerGrid.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  onClickCallback: PropTypes.func
}

ManagerGrid.defaultProps = {
  onClickCallback: null
}
