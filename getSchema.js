import fs from "fs";
import http from "http";
import { API_URL } from "./App/constants";

http.get(`${API_URL}/schema`, (res) => {
  let schema = '';

  res.on('data', (chunk) => {
    schema += chunk;
  })

  res.on('end', () => {
    fs.writeFile('schema.graphql', schema, (err) => {
      if (err)
        console.error(err)
    })
  })
}).on('error', (err) => console.error(err))
