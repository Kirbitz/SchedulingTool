import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Card, Box, CardContent, CardMedia, Typography } from '@mui/material'
import { Backpack, Person, Star } from '@mui/icons-material'

// Employee Card with base data of the employee
export default function EmployeeCard (props) {
  // Destructor props into employee, previewToggle, onClickCallback, and isManager
  const { employee, previewToggle, onClickCallback, isManager } = props

  // Hover action for the cards
  const hoverAction = {
    cursor: 'pointer',
    boxShadow: 5
  }

  // Runs call back function up a card being clicked
  const onCardClicked = () => {
    if (onClickCallback) { onClickCallback(employee.id) }
  }

  // Convert employee data to employee cards
  return (
    <Grid item xs={12} sm={6} md={4} lg={isManager ? 4 : 3}>
      <Card sx={[{ display: 'flex' }, { '&:hover': hoverAction }]} onClick={onCardClicked}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'left' }}>
              <Person sx={{ mr: 1, color: 'purple' }} />
              <Typography variant='subtitle2' component='div'>
                {previewToggle ? 'Sam Doe' : `${employee.name}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'left' }}>
              <Star sx={{ mr: 1, color: '#FFD700' }} />
              <Typography variant='subtitle2' component='div'>
                {`${employee.yearAtSTAR} Year`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'left' }}>
              <Backpack sx={{ mr: 1, color: '#734e2c' }} />
              <Typography variant='subtitle2' component='div'>
                {`${employee.major}`}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <CardMedia
          component='img'
          sx={{ width: 100 }}
          image={previewToggle ? 'StoutIcon.jpg' : `avatars/${employee.avatar}`}
          alt={`Image of ${employee.name}`}
        />
      </Card>
    </Grid>
  )
}

// Checks for the props coming into EmployeeCard
EmployeeCard.propTypes = {
  isManager: PropTypes.bool,
  onClickCallback: PropTypes.func,
  previewToggle: PropTypes.bool.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yearAtSTAR: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired
}

EmployeeCard.defaultProps = {
  isManager: false,
  onClickCallback: null
}
