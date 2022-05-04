import React from 'react'
import PropTypes from 'prop-types'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

export default function MyDatePicker (props) {
  // Destructor props into textLabel, dateVal, and changeDate
  const { textLabel, dateVal, changeDate } = props

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
          label={textLabel}
          value={dateVal}
          onChange={(newDate) => {
            if (changeDate) { changeDate(newDate) }
          }}
          renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

// Prop validation for MyDatePicker
MyDatePicker.propTypes = {
  textLabel: PropTypes.string.isRequired,
  dateVal: PropTypes.object,
  changeDate: PropTypes.func
}

MyDatePicker.defaultProps = {
  dateVal: null,
  changeDate: null
}
