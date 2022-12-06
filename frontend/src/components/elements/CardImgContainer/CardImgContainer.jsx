import React from 'react'
import { Card, CardImg, Col } from 'react-bootstrap'
import './CardImgContainer.css'

const CardImgContainer = ({imgSrc, className, text}) => {
  return (
    <Col sm={12} md={6} lg={4} xl={3} style={{padding: 60}}>
      <Card>
        <Card.Header>
          <CardImg src={imgSrc} className={className}/>
      </Card.Header>
      <Card.Body>
          <Card.Text as='div'>
            {text}
          </Card.Text>
        </Card.Body>
      </Card>

    </Col>
  )
}

export default CardImgContainer 