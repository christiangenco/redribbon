import React, { Component } from "react";
import "./App.css";

import {
  Button,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  PageHeader,
  Label
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ResourcesList from "./ResourcesList";
import Resource from "./Resource";

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageHeader>
                <Link to="/">Red Ribbon</Link>
                {" "}
                <small>resources for people in Dallas with HIV/AIDS</small>
              </PageHeader>

              <Route exact path="/" component={ResourcesList} />
              <Route exact path="/services/" component={ResourcesList} />
              <Route path="/services/:serviceList" component={ResourcesList} />
              <Route path="/resources/:slug" component={Resource} />
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
