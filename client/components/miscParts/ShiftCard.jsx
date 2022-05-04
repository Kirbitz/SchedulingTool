import React from 'react'
import PropTypes from 'prop-types'

import ComboBox from './ComboBox.jsx'

import { Paper, Typography } from '@mui/material'

export default function ShiftCard (props) {
  // Card colors for the papers
  const shiftColors = ['#1ec740', 'orange', 'violet']

  // Destructor props into previewToggle, schedulePos, startTime, endTime and employees
  const { previewToggle, schedulePos, startTime, endTime, employees } = props

  return (
    <Paper sx={{ bgcolor: shiftColors[schedulePos], m: 1 }}>
      <Typography variant='subtitle1' component='div' align='center' sx={{ mt: 1 }}>
        {`${startTime} - ${endTime}`}
      </Typography>
      <ComboBox previewToggle={previewToggle} schedulePos={schedulePos} employees={employees} />
    </Paper>
  )
}

// Props validation for ShiftCard
ShiftCard.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  schedulePos: PropTypes.number.isRequired,
  previewToggle: PropTypes.bool,
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
}
