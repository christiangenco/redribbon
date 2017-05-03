curl "https://api.airtable.com/v0/appCgeXzSSeyt7iZj/facilities?maxRecords=200&view=Main%20View" \
-H "Authorization: Bearer keyEyUZNV7oH0OMEd" | jq "." > src/data.json
