import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@mui/material'

export default function ComboBox (props) {
  // Colors for the textFields
  const textFieldColors = ['success', 'warning', 'secondary']

  // Destructor props into previewToggle, schedulePos, and employees
  const { previewToggle, schedulePos, employees } = props

  const previewEmployees = [
    { label: 'Sam Doe' },
    { label: 'John Deer' },
    { label: 'Rob Smith' },
    { label: 'Jake Meyer' },
    { label: 'Phil Dunphy' },
    { label: 'Michael Scott' }
  ]

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="combo-box-employees"
      size='small'
      options={previewToggle ? previewEmployees : employees}
      sx={{ flexGrow: 1, m: 1 }}
      renderInput={(params) => <TextField {...params} label="Employee" variant='standard' color={textFieldColors[schedulePos]} />}
    />
  )
}

// Props validation for ComboBox
ComboBox.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  schedulePos: PropTypes.number.isRequired,
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
}
