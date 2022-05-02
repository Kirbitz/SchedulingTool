import React from 'react'
import PropTypes from 'prop-types'

import TabPanel from '../miscParts/TabPanel.jsx'
import WeekCalendar from '../miscParts/WeekCalendar.jsx'

import { DialogContent } from '@mui/material'

export default function InputModalBody (props) {
  const { tabPos } = props

  const { previewToggle } = props
  return (
    <DialogContent>
      <TabPanel value={tabPos} index={0}>
        <WeekCalendar previewToggle={previewToggle} schedulePos={0} />
      </TabPanel>
      <TabPanel value={tabPos} index={1}>
        <WeekCalendar previewToggle={previewToggle} schedulePos={1} />
      </TabPanel>
      <TabPanel value={tabPos} index={2}>
        <WeekCalendar previewToggle={previewToggle} schedulePos={2} />
      </TabPanel>
    </DialogContent>
  )
}

InputModalBody.propTypes = {
  tabPos: PropTypes.number.isRequired,
  previewToggle: PropTypes.bool.isRequired
}
