import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";

export default class Resource extends Component {
  render() {
    const { resource } = this.props;
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
      <div>
        {/*<h2>{fields.Name}</h2> */}
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
              return <tr key={key}><th>{key}</th><td>{fields[key]}</td></tr>;
            })}
            <tr style={{ display: "none" }}>
              <th>Services</th>
              <td>{fields.tags.join(", ")}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
