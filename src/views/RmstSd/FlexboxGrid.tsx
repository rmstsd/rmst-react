import { Grid, Row, Col } from 'react-flexbox-grid'

export default function FlexboxGrid() {
  return (
    <div>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={3} md={2} lg={1}>
            <div style={{ backgroundColor: 'pink' }}>1</div>
          </Col>
          <Col xs={6} sm={6} md={8} lg={10}>
            <div style={{ backgroundColor: 'pink' }}>2</div>
          </Col>
          <Col xs={6} sm={3} md={2} lg={1}>
            <div style={{ backgroundColor: 'pink' }}>3</div>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
