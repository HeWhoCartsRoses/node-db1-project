const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(rows => {
            res.status(200).json({
                data: rows
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            });
        });
});
server.get("/:id", (req, res) => {
    db("accounts")
        .where({
            id: req.params.id
        })
        .first()
        .then(post => {
            if (post) {
                res.status(200).json({
                    data: post
                });
            } else {
                res.status(404).json({
                    message: "Post not found"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "sorry, ran into an error"
            });
        });
});
server.post("/", (req, res) => {
    db("accounts")
        .insert(req.body, "id")
        .then(ids => {
            res.status(201).json({
                results: ids
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "sorry, ran into an error"
            });
        });
});
server.put("/:id", (req, res) => {
    const changes = req.body;
    db("accounts")
        .where({
            id: req.params.id
        })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: "record updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Post not found"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "sorry, ran into an error"
            });
        });
});
server.delete("/:id", (req, res) => {
    db("accounts")
        .where({
            id: req.params.id
        })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: "record deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Post not found"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "sorry, ran into an error"
            });
        });
});

module.exports = server;