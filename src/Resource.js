import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";

export default class Resource extends Component {
  render() {
    const { resource } = this.props;
    if (!resource) return <p>resource not found</p>;

    const fields = resource.fields;
    const address = `${fields.Address}, ${fields.Suite
      ? fields.Suite + ", "
      : ""}${fields.City && fields.City[0]} ${resource.State ||
      "TX"} ${fields.Zip || ""}`;

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
        <p>
          {fields.BIO}
        </p>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th>Address</th>
              <td>
                <a
                  href={`http://maps.google.com/?q=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                >
                  {address}
                </a>
              </td>
            </tr>
            {attributes.map(key => {
              if (!fields[key]) return null;
              let value = fields[key];
              if (key.toLowerCase() === "email")
                value = (
                  <a href={"mailto:" + fields[key]}>
                    {fields[key]}
                  </a>
                );

              if (key.toLowerCase() === "web site")
                value = (
                  <a href={"//" + fields[key]} target="_blank">
                    {fields[key]}
                  </a>
                );

              if (
                key.toLowerCase() === "phone" ||
                key.toLowerCase() === "fax"
              ) {
                value = fields[key].replace(
                  /(\d{3}).*(\d{3}).*(\d{4})/,
                  "($1) $2-$3"
                );
              }

              return (
                <tr key={key}>
                  <th>
                    {key}
                  </th>
                  <td>
                    {value}
                  </td>
                </tr>
              );
            })}
            <tr style={{ display: "none" }}>
              <th>Services</th>
              <td>
                {fields.tags.join(", ")}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
