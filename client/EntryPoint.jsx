import React from 'react'

import { Container, CssBaseline } from '@mui/material'

// Grabs components for the entrypoint
import PageHeader from './components/PageHeader'
import ManagerGrid from './components/ManagerGrid.jsx'
import EmployeeGrid from './components/EmployeeGrid.jsx'
import EmployeeDetailsModal from './components/modals/EmployeeDetailsModal.jsx'
import WeekendShiftsModal from './components/modals/WeekendShiftsModal.jsx'
import FinalShiftModal from './components/modals/FinalShiftModal.jsx'
import InputScheduleModal from './components/modals/InputScheduleModal.jsx'

export default function EntryPoint (props) {
  // Preview toggle to switch information in order to maintain privacy
  const previewToggle = true

  // Hooks necessary to make the page run
  const [employeeId, setEmployeeId] = React.useState('')
  const [showWeekendModal, setShowWeekendModal] = React.useState(false)
  const [showFinalModal, setShowFinalModal] = React.useState(false)
  const [showInputModal, setShowInputModal] = React.useState(false)

  // Function to change the employee ID
  const onEmployeeClicked = (newEmployeeId) => {
    if (newEmployeeId !== employeeId) {
      setEmployeeId(newEmployeeId)
    }
  }

  // Function to open the weekend modal
  const openWeekendModal = () => {
    setShowWeekendModal(true)
  }

  // Function to open the final modal
  const openFinalModal = () => {
    setShowFinalModal(true)
  }

  // Function to open the input modal
  const openInputModal = () => {
    setShowInputModal(true)
  }

  // Function to close the all modals
  const onModalClose = () => {
    setEmployeeId('')
    setShowWeekendModal(false)
    setShowFinalModal(false)
    setShowInputModal(false)
  }

  return (
    <Container>
      <CssBaseline />
      {/* Header app bar for the page */}
      <PageHeader previewToggle={previewToggle} openWeekendModal={openWeekendModal} openFinalModal={openFinalModal} openInputModal={openInputModal} />

      {/* Grid for the managers of the desk */}
      <ManagerGrid previewToggle={previewToggle} onClickCallback={onEmployeeClicked} />

      {/* Grid for the managers of the desk */}
      <EmployeeGrid previewToggle={previewToggle} onClickCallback={onEmployeeClicked} />

      {/* Modal of the employee details */}
      <EmployeeDetailsModal previewToggle={previewToggle} employeeId={employeeId} onClose={onModalClose} />

      {/* Modal to display sign up data from employees */}
      <WeekendShiftsModal previewToggle={previewToggle} openModal={showWeekendModal} onClose={onModalClose} />

      {/* Modal to display sign up data from employees */}
      <FinalShiftModal previewToggle={previewToggle} openModal={showFinalModal} onClose={onModalClose} />

      {/* Modal to display sign up data for employees */}
      <InputScheduleModal previewToggle={previewToggle} openModal={showInputModal} onClose={onModalClose} />
    </Container>
  )
}
