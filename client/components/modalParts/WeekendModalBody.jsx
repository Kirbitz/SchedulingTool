import React from 'react'
import PropTypes from 'prop-types'

import { Box, Divider, DialogContent, Typography } from '@mui/material'

export default function WeekendModalBody (props) {
  const { previewToggle, weekendShiftData } = props

  if (weekendShiftData) {
    return (
      <DialogContent>
        {weekendShiftData.map((employee) => (
          <React.Fragment key={employee.id}>
            <Divider />
            <Box key={employee.id} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2, mb: 2 }}>
              <Typography variant='h4' component='div'>
                {previewToggle ? 'Sam Doe' : employee.name}
              </Typography>
              <Typography variant='h6' component='div'>
                Total Shifts: {employee.total_shifts}
              </Typography>
              <Typography variant='h6' component='div' sx={{ color: '#2e88db' }}>
                Saturday: {employee.saturday}
              </Typography>
              <Typography variant='h6' component='div'>
                {employee.saturday_dates.join(', ')}
              </Typography>
              <Typography variant='h6' component='div' sx={{ color: '#FFD700' }}>
                Sunday: {employee.sunday}
              </Typography>
              <Typography variant='h6' component='div'>
                {employee.sunday_dates.join(', ')}
              </Typography>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </DialogContent>
    )
  } else {
    return (<div></div>)
  }
}

WeekendModalBody.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  weekendShiftData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    saturday: PropTypes.number.isRequired,
    sunday: PropTypes.number.isRequired,
    total_shifts: PropTypes.number.isRequired,
    saturday_dates: PropTypes.arrayOf(PropTypes.string),
    sunday_dates: PropTypes.arrayOf(PropTypes.string)
  }))
}
