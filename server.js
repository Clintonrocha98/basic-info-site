import express from "express";
import { readFile, readdirSync } from "node:fs";

const app = express();
const port = 3333;

app.use('/styles', express.static('styles'));

const htmlfiles = readdirSync("./pages", { withFileTypes: true }).map(
  (file) => file.name
);

htmlfiles.forEach((file) => {
  let route = "/" + file.slice(0, -5);
  route = file == "index.html" ? "/" : route;

  app.get(route, (req, res) => {
    readFile(`./pages/${file}`, (err, data) => {
      if (err) {
        res.status(404).write("Página não encontrada");
      } else {
        res.status(200).write(data);
      }
    });
  });
});

app.get("*", (req, res) => {
  readFile("./pages/404.html", (err, page404) => {
    if (err) {
      res.status(404).write("Página não encontrada");
    } else {
      res.status(404).write(page404);
    }
  });
});



app.listen(port, () => {
  console.log(`Server running ${port}!`);
});
