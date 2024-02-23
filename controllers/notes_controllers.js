const ToDoNote = require("../schema/notes_model");
const { upload } = require("../server");

exports.createNote = (req, res) => {
  const newNote = req.body;

  ToDoNote.create(newNote)
    .then((note) => {
      return res.json({ message: "Note Created Successfully", note: note });
    })
    .catch((error) => {
      return res.json({ message: "Note Did not Create" });
    });
};

exports.updateNote = async (req, res) => {
  const newNote = req.body;
  const oldNote = await ToDoNote.findOne({ where: { id: newNote.id } });
  for (const [key, value] of Object.entries(newNote)) {
    oldNote[key] = value;
  }
  await oldNote.save();
  return res.json({ message: "Note updated successfully", note: oldNote });
};

exports.getNotes = async (req, res) => {
  var page = Number(req.query.page) || 1;
  var notes = await ToDoNote.findAll();
  if (page > Math.ceil(notes.length / 5)) page = Math.ceil(notes.length / 5);
  notes = notes.slice((page - 1) * 5, page * 5);
  return res.json({ notes: notes, page: page });
};

exports.deleteNote = async (req, res) => {
  const note_id = req.params.id;
  const oldNote = await ToDoNote.findOne({ where: { id: note_id } });
  await oldNote.destroy();
  return res.json({ message: "Note deleted successfully" });
};

exports.createNotes = async (req, res) => {
  const newNotes = req.body;
  const response = await ToDoNote.bulkCreate(newNotes);
  //   newNotes.forEach(async (newNote) => {
  //     await ToDoNote.create(newNote);
  //   });
  return res.json({ message: "Notes Created Successfully", notes: response });
};

exports.uploadImage = async (req, res) => {
  var filepath;
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ message: "File not uploaded", error: err });
    }
    filepath = "/images/" + req.body.filename;
    const note_id = req.body.id;
    const oldNote = await ToDoNote.findOne({ where: { id: note_id } });
    oldNote.imageUrl = filepath;
    await oldNote.save();

    return res.json({
      message: "File uploaded successfully",
      note: oldNote,
    });
  });
};
