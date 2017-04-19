import React, { Component } from "react";
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

import data from "./data.js";
const { records, tags } = data;

export default class ResourcesList extends Component {
  render() {
    return (
      <ListGroup>
        {records.map(record => {
          return (
            <ListGroupItem
              key={record.id}
              header={record.fields.Name}
              onClick={() =>
                this.props.history.push(`/resources/${record.fields.slug}`)}
            >
              {record.fields.tags.join(", ")}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}
