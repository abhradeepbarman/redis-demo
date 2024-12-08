import axios from "axios";
import express from "express";
import client from "./client.js";

const app = express();

app.get("/", async (req, res) => {
    const cacheVal = await client.get("todos");

    if (cacheVal) {
        return res.json(JSON.parse(cacheVal));
    }

    const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
    );

    await client.set("todos", JSON.stringify(data));
    await client.expire("todos", 30);

    return res.json(data);
});

app.listen(9000, () => {
    console.log(`App started at PORT 9000`);
});
