const express = require("express");
const fs = require("fs");

require("./db/mongoose");

const Note = require("./models/note");
const app = express();

app.use(express.json());

// GET
app.get("/notes", async (req, res) => {
	try {
		const notes = await Note.find({});

		res.send(notes);
	} catch (error) {
		console.log("Error get: ", error);
		res.status(500).send(error);
	}
});

// POST
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

// UPDATE
app.patch("/notes/:id", async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).send();
		}

		note.note = req.body.note;
		await note.save();

		res.status(200).send(note);
	} catch (error) {
		console.log("Error update: ", error);
		res.status(404).send(error);
	}
});

// DELETE
app.delete("/notes/:id", async (req, res) => {
	try {
		const note = await Note.findByIdAndDelete(req.params.id);

		if (!note) {
			return res.status(404).send();
		}

		res.status(200).send("The note has been deleted");
	} catch (error) {
		console.log("Error delete: ", error);
		res.status(500).send(error);
	}
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
