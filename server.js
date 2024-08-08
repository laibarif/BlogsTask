const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE blogs (id INTEGER PRIMARY KEY, title TEXT, content TEXT, coverImage TEXT)");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/api/blogs', upload.single('coverImage'), (req, res) => {
  const { title, content } = req.body;
  const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

  const stmt = db.prepare("INSERT INTO blogs (title, content, coverImage) VALUES (?, ?, ?)");
  stmt.run(title, content, coverImage, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

app.get('/api/blogs', (req, res) => {
  db.all("SELECT * FROM blogs", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
