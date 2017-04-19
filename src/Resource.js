import React, { Component } from "react";
import data from "./data.js";
const { records, tags } = data;
import {
  Button,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  PageHeader,
  Table
} from "react-bootstrap";

export default class Resource extends Component {
  render() {
    const { slug } = this.props.match.params;
    const resource = records.find(r => r.fields.slug === slug);

    if (!resource) return <p>resource not found</p>;

    const fields = resource.fields;
    const address = `${fields.Address}, ${fields.Suite ? fields.Suite + ", " : ""}${fields.City && fields.City[0]} ${resource.State || "TX"} ${fields.Zip || ""}`;

    const attributes = [
      "Phone",
      "Fax",
      "TTY",
      "Toll Free",
      "Hours of Operation",
      "Case Management Hours",
      "Web Site",
      "Contact",
      "email"
    ];

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <p>
              <h2>{fields.Name}</h2>
              <p>{fields.BIO}</p>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <th>Address</th>
                    <td>
                      <a
                        href={
                          `http://maps.google.com/?q=${encodeURIComponent(address)}`
                        }
                        target="_blank"
                      >
                        {address}
                      </a>
                    </td>
                  </tr>
                  {attributes.map(key => {
                    if (!fields[key]) return null;
                    return (
                      <tr key={key}><th>{key}</th><td>{fields[key]}</td></tr>
                    );
                  })}
                  <tr>
                    <th>Services</th>
                    <td>{fields.tags.join(", ")}</td>
                  </tr>
                </tbody>
              </Table>
            </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}
