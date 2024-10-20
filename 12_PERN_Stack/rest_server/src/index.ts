import server from "./server";

server.use("/", (req, res) => {
    res.send("Hello World");
});
server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
