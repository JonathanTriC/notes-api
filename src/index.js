const express = require("express");
const fs = require("fs");

require("./db/mongoose");

const Note = require("./models/note");
const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
	try {
		const notes = await Note.find({});

		res.send(notes);
	} catch (error) {
		console.log("Error get: ", error);
		res.status(500).send(error);
	}
});

app.post("/notes", async (req, res) => {
	const note = new Note(req.body);

	try {
		await note.save();

		res.status(200).send(note);
	} catch (error) {
		console.log("Error post: ", error);
		res.status(500).send(error);
	}
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
