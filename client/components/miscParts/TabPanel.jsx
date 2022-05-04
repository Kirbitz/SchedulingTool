import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export default function TabPanel (props) {
  // Destructor props into children, value, and index
  const { children, value, index } = props

  return (
    // Shows content if the value passed in is equal to the tabs index
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
    >
      {value === index && (
        <Box alignItems='center' sx={{ width: 1 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

// Props validation for TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}
