import React, { Component } from "react";
import { Label, ListGroup, Tabs, Tab } from "react-bootstrap";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import data from "./data.js";
const { records, tags, categories } = data;

export default class ResourcesList extends Component {
  state = {};
  render() {
    const { serviceList } = this.props.match.params;
    const services = new Set([
      ...(serviceList || "")
        .split(",")
        .map(service => decodeURIComponent(service))
    ]);
    services.delete(""); // lazy solution

    const filteredRecords = services.size === 0
      ? records
      : records.filter(record =>
          (record.fields.tags || [])
            .reduce((tf, tag) => tf || services.has(tag), false));

    return (
      <div>
        {JSON.stringify()}
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          {categories.map(category => (
            <Tab eventKey={category} title={category}>Tab for {category}</Tab>
          ))}
        </Tabs>
        <p>What do you need?</p>
        <div id="tagList">
          {tags.map(tag => (
            <Label
              key={tag}
              bsStyle={services.has(tag) ? "primary" : "default"}
              onClick={() => {
                services.has(tag) ? services.delete(tag) : services.add(tag);
                const serializedServices = [...services]
                  .map(service => encodeURIComponent(service))
                  .join(",");
                this.props.history.push(`/services/${serializedServices}`);
              }}
            >
              {tag}
            </Label>
          ))}
        </div>
        <br />
        <br />
        <ListGroup>
          {filteredRecords.map(record => {
            return (
              <Link
                to={`/resources/${record.fields.slug}`}
                className="list-group-item"
                key={record.id}
              >
                <h4 className="list-group-item-heading">
                  {record.fields.Name}
                </h4>
                {JSON.stringify(record.fields.categories)}
                {record.fields.tags
                  .map(
                    tag => services.has(tag) ? <b>{tag}</b> : <span>{tag}</span>
                  )
                  .reduce(
                    (accu, elem) => {
                      return accu === null ? [elem] : [...accu, ", ", elem];
                    },
                    null
                  )}
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
