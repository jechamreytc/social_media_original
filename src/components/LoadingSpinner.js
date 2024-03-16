import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    //interface loading
    <Container className='text-center mt-3'>
      <Spinner animation="grow" variant='light' />
    </Container>
  )
}

export default LoadingSpinner