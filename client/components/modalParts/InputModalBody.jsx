import React from 'react'
import PropTypes from 'prop-types'

import TabPanel from '../miscParts/TabPanel.jsx'
import WeekCalendar from '../miscParts/WeekCalendar.jsx'

import { DialogContent } from '@mui/material'

export default function InputModalBody (props) {
  // Destructor props into tabPosition
  const { tabPos } = props

  const { previewToggle } = props
  return (
    <DialogContent>
      <TabPanel value={tabPos} index={0}>
        {/* WeekCalendar to grab display input data for Walkup */}
        <WeekCalendar previewToggle={previewToggle} schedulePos={0} />
      </TabPanel>
      <TabPanel value={tabPos} index={1}>
        {/* WeekCalendar to grab display input data for QA */}
        <WeekCalendar previewToggle={previewToggle} schedulePos={1} />
      </TabPanel>
      <TabPanel value={tabPos} index={2}>
        {/* WeekCalendar to grab display input data for PC Repair */}
        <WeekCalendar previewToggle={previewToggle} schedulePos={2} />
      </TabPanel>
    </DialogContent>
  )
}

// Prop validation for InputModalBody
InputModalBody.propTypes = {
  tabPos: PropTypes.number.isRequired,
  previewToggle: PropTypes.bool.isRequired
}
