import logo from './assets/juxcespinner100.gif';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import { NavBar, LabelBackstop, JuxceSeparator } from './components';
import { Home, Profile, ExternalApi } from './views';
import GetTokenBruh from './components/test-auth-call';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './auth/protected-route';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="appHeader">
        <Row>
          <Col className="col-md-2 text-center my-auto">
            <img src={logo} className="appLogo" alt="logo" />
          </Col>
          <Col className="col-md-8 text-center my-auto">
            <h1 className="display-1">Record Label Backstop</h1>
            <JuxceSeparator />
          </Col>
          <Col className="col-md-2 text-center my-auto">
            <img src={logo} className="appLogo" alt="logo" />
          </Col>
        </Row>
      </Container>
      <div className="container flex-grow-1">
        <div className="mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/external-api" component={ExternalApi} />
          </Switch>
        </div>
      </div>
      <GetTokenBruh />
      {/* <LabelBackstop /> */}
    </div>
  );
}

export default App;
