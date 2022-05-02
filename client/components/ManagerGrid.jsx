import React from 'react'
import PropTypes from 'prop-types'
import { getManagerList } from '../dataHelper.js'

import { Grid, Typography } from '@mui/material'

import ManagerCard from './ManagerCard.jsx'

export default function ManagerGrid (props) {
  const { previewToggle, onClickCallback } = props

  const [managerSummary, setManagerSummary] = React.useState(null)

  const updateManagerData = () => {
    getManagerList()
      .then((response) => { setManagerSummary(response.data) })
      .catch((err) => {
        alert('Failed to retrieve data')
        console.error(err)
      })
  }

  React.useEffect(() => {
    updateManagerData()
  }, [])

  if (!Array.isArray(managerSummary) || managerSummary.length < 1) {
    return (
      <Grid>
        <p>Loading ...</p>
      </Grid>
    )
  }

  const managerCards = managerSummary.map((manager) => {
    return <ManagerCard key={manager.id} employee={manager} previewToggle={previewToggle} onClickCallback={onClickCallback} />
  })

  return (
    <React.Fragment>
      <Typography variant='h3' component='div' align='center' sx={{ mt: 2 }}>
        Managers
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
        {managerCards}
      </Grid>
    </React.Fragment>
  )
}

ManagerGrid.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  onClickCallback: PropTypes.func
}

ManagerGrid.defaultProps = {
  onClickCallback: null
}
