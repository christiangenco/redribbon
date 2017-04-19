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
      <div>
        <p>What do you need?</p>
        {tags.map(tag => <Label key={tag}>{tag}</Label>)}
        <br />
        <br />
        <ListGroup>
          {records.map(record => {
            return (
              <Link
                to={`/resources/${record.fields.slug}`}
                className="list-group-item"
                key={record.id}
              >
                <h4 className="list-group-item-heading">
                  {record.fields.Name}
                </h4>
                {record.fields.tags.join(", ")}
              </Link>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

// onClick={() =>
// this.props.history.push()}
