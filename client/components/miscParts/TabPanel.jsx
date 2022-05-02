import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export default function TabPanel (props) {
  const { children, value, index } = props

  return (
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}
