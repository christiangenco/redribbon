import React, { Component } from "react";
import { Label, ListGroup, Tabs, Tab } from "react-bootstrap";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import data from "./data.js";
const { records, tags, categories } = data;

// this.props.history.push(`/services/${serializedServices}`);

export default class ResourcesList extends Component {
  state = {};

  renderServiceList(category, subcategory) {
    let filteredRecords;

    if (!category || `${category}`.toLowerCase() === "all") {
      filteredRecords = records;
    } else if (
      !subcategory ||
      `${subcategory}`.toLowerCase().replace(/[^a-z]/g, "") === "all"
    ) {
      // category, but no subcategory
      filteredRecords = records.filter(
        record => (record.fields.categories || []).indexOf(category) !== -1
      );
    } else if (subcategory) {
      filteredRecords = records.filter(
        record => (record.fields.tags || []).indexOf(subcategory) !== -1
      );
    } else {
      filteredRecords = [];
    }

    // return JSON.stringify({ category, subcategory });
    // return "hello world";

    // if (category && category !== "all") {
    //   filteredRecords = records.filter(
    //     record => (record.fields.categories || []).indexOf(category) !== -1
    //   );
    // }
    // const filteredRecords = services.size === 0
    //   ? records
    //   : records.filter(record =>
    // (record.fields.tags || [])
    //   .reduce((tf, tag) => tf || services.has(tag), false));

    return (
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
            </Link>
          );
        })}
      </ListGroup>
    );
  }

  renderSubcategories(category) {
    if (category.toLowerCase() === "all")
      return this.renderServiceList(category, null);

    const subcategories = [...(categories[category] || [])].sort();
    subcategories.unshift("/All");

    return (
      <Tabs
        activeKey={this.state.subcategory}
        onSelect={key => {
          this.setState({ subcategory: key });
        }}
        bsStyle="pills"
        animation={false}
        defaultActiveKey={"/All"}
        style={{ marginTop: 10 }}
        id="subcategories"
      >
        {subcategories.map(subcategory => (
          <Tab
            eventKey={subcategory}
            title={subcategory.split("/")[1]}
            key={subcategory}
          >
            {this.renderServiceList(category, subcategory)}
          </Tab>
        ))}
      </Tabs>
    );
  }

  render() {
    // const { serviceList } = this.props.match.params;
    // const services = new Set([
    //   ...(serviceList || "")
    //     .split(",")
    //     .map(service => decodeURIComponent(service))
    // ]);
    // services.delete(""); // lazy solution
    const categoryNames = Object.keys(categories);
    categoryNames.unshift("All");

    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={key => {
            this.setState({ category: key });
          }}
          id="categories"
          bsStyle="tabs"
          animation={false}
          defaultActiveKey={"All"}
        >
          {categoryNames.map(category => (
            <Tab eventKey={category} title={category} key={category}>
              {this.renderSubcategories(category)}
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

// onClick={() =>
// this.props.history.push()}
