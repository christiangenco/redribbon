const nameToSlug = name => {
  return name.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z-]/g, "");
};

const data = require("./data.json");

data.records = data.records.map(record => {
  record.fields.slug = nameToSlug(record.fields.Name);
  record.fields.tags = Object.keys(record.fields)
    .filter(k => record.fields[k] === true)
    .map(tag => tag.trim());
  record.fields.categories = [
    ...new Set(record.fields.tags.map(tag => tag.split("/")[0]))
  ];
  return record;
});

data.categories = [
  ...new Set(
    data.records
      .map(record => record.fields.categories)
      .reduce((a, b) => a.concat(b), [])
  )
].sort();

data.tags = [
  ...new Set(
    data.records
      .map(record => record.fields.tags)
      .reduce((a, b) => a.concat(b), [])
  )
].sort();

export default data;
