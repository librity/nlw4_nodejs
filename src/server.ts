import express from "express";

const app = express();

app.get("/users", (request, response) => {
  return response.json({ message: "This is a get request." });
});

app.post("/users", (request, response) => {
  return response.json({ message: "This is a post request." });
});

const port = 3333;
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
