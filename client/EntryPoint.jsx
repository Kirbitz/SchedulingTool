import React from 'react'

import { Container, CssBaseline } from '@mui/material'

import PageHeader from './components/PageHeader'
import ManagerGrid from './components/ManagerGrid.jsx'
import EmployeeGrid from './components/EmployeeGrid.jsx'
import EmployeeDetailsModal from './components/modals/EmployeeDetailsModal.jsx'
import WeekendShiftsModal from './components/modals/WeekendShiftsModal.jsx'
import FinalShiftModal from './components/modals/FinalShiftModal.jsx'
import InputScheduleModal from './components/modals/InputScheduleModal.jsx'

export default function EntryPoint (props) {
  const previewToggle = false

  const [employeeId, setEmployeeId] = React.useState('')
  const [showWeekendModal, setShowWeekendModal] = React.useState(false)
  const [showFinalModal, setShowFinalModal] = React.useState(false)
  const [showInputModal, setShowInputModal] = React.useState(false)

  const onEmployeeClicked = (newEmployeeId) => {
    if (newEmployeeId !== employeeId) {
      setEmployeeId(newEmployeeId)
    }
  }

  const openWeekendModal = () => {
    setShowWeekendModal(true)
  }

  const openFinalModal = () => {
    setShowFinalModal(true)
  }

  const openInputModal = () => {
    setShowInputModal(true)
  }

  const onModalClose = () => {
    setEmployeeId('')
    setShowWeekendModal(false)
    setShowFinalModal(false)
    setShowInputModal(false)
  }

  return (
    <Container>
      <CssBaseline />
      <PageHeader previewToggle={previewToggle} openWeekendModal={openWeekendModal} openFinalModal={openFinalModal} openInputModal={openInputModal} />
      <ManagerGrid previewToggle={previewToggle} onClickCallback={onEmployeeClicked} />
      <EmployeeGrid previewToggle={previewToggle} onClickCallback={onEmployeeClicked} />
      <EmployeeDetailsModal previewToggle={previewToggle} employeeId={employeeId} onClose={onModalClose} />
      <WeekendShiftsModal previewToggle={previewToggle} openModal={showWeekendModal} onClose={onModalClose} />
      <FinalShiftModal previewToggle={previewToggle} openModal={showFinalModal} onClose={onModalClose} />
      <InputScheduleModal previewToggle={previewToggle} openModal={showInputModal} onClose={onModalClose} />
    </Container>
  )
}
