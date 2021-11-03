import logo from './assets/juxcespinner100.gif'
import './App.css'
import { Container, Row, Col } from 'reactstrap'
import LabelBackstop from './components/LabelBackstop.js'
import JuxceSeparator from './components/JuxceSeparator.js'

function App() {
  return (
    <div className='App'>
      <Container className='appHeader'>
        <Row>
          <Col className='col-md-2 text-center my-auto'>
            <img src={logo} className='appLogo' alt='logo' />
          </Col>
          <Col className='col-md-8 text-center my-auto'>
            <h1 className='display-1'>Record Label Backstop</h1>
            <JuxceSeparator />
          </Col>
          <Col className='col-md-2 text-center my-auto'>
            <img src={logo} className='appLogo' alt='logo' />
          </Col>
        </Row>
      </Container>
      <LabelBackstop />
    </div>
  )
}

export default App
