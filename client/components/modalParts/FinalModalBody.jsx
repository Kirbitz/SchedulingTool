import React from 'react'
import PropTypes from 'prop-types'

import { Box, Divider, DialogContent, Typography } from '@mui/material'

export default function WeekendModalBody (props) {
  const { previewToggle, finalShiftData } = props

  if (finalShiftData) {
    return (
      <DialogContent>
        {finalShiftData.map((employee) => (
          <React.Fragment key={employee.id}>
            <Divider />
            <Box key={employee.id} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2, mb: 2 }}>
              <Typography variant='h4' component='div'>
                {previewToggle ? 'Sam Doe' : employee.name}
              </Typography>
              <Typography variant='h6' component='div'>
                Total Shifts: {employee.total_shifts} Shifts
              </Typography>
              <Typography variant='h6' component='div' sx={{ color: 'green' }}>
                Walkup: {employee.walkup} Shifts
              </Typography>
              <Typography variant='h6' component='div'>
                {employee.walkup_dates.join(', ')}
              </Typography>
              <Typography variant='h6' component='div' sx={{ color: 'orange' }}>
                QA: {employee.qa} Shifts
              </Typography>
              <Typography variant='h6' component='div'>
                {employee.qa_dates.join(', ')}
              </Typography>
              <Typography variant='h6' component='div' sx={{ color: 'purple' }}>
                PC Repair: {employee.pcrepair} Shifts
              </Typography>
              <Typography variant='h6' component='div'>
                {employee.pcrepair_dates.join(', ')}
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
  finalShiftData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    walkup: PropTypes.number.isRequired,
    qa: PropTypes.number.isRequired,
    pcrepair: PropTypes.number.isRequired,
    total_shifts: PropTypes.number.isRequired,
    walkup_dates: PropTypes.arrayOf(PropTypes.string),
    qa_dates: PropTypes.arrayOf(PropTypes.string),
    pcrepair_dates: PropTypes.arrayOf(PropTypes.string)
  }))
}
