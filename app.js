const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data awal: daftar buku
const books = [
    { id: 1, judul: "Luhut", penulis: "glen" },
    { id: 2, judul: "ynkts", penulis: "ngab owi" }
];


// Endpoint GET untuk mengembalikan daftar buku dalam format JSON atau XML
app.get("/geni/buku", (req, res) => {
    if (req.headers.accept === "application/xml") {
        let xmlData = '<?xml version="1.0"?><books>';
        books.forEach(book => {
            xmlData += `<book><id>${book.id}</id><judul>${book.judul}</judul><penulis>${book.penulis}</penulis></book>`;
        });
        xmlData += '</books>';
        res.set("Content-Type", "application/xml");
        res.send(xmlData);
    } else {
        res.json(books);
    }
});

// Endpoint POST untuk menambahkan buku baru dalam format JSON atau XML
app.post("/geni/buku", (req, res) => {
    const newBook = {
        id: books.length + 1,
        judul: req.body.judul,
        penulis: req.body.penulis
    };

    books.push(newBook);

    if (req.headers.accept === "application/xml") {
        let xmlData = `<?xml version="1.0"?><book><id>${newBook.id}</id><judul>${newBook.judul}</judul><penulis>${newBook.penulis}</penulis></book>`;
        res.set("Content-Type", "application/xml");
        res.send(xmlData);
    } else {
        res.json(newBook);
    }
});

// Menjalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
