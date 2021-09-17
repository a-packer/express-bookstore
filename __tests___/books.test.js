/** Tests for books route */
process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");

// isbn of a test book
let book_isbn;

beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO 
      books (isbn, amazon_url,author,language,pages,publisher,title,year)   
      VALUES(
        '123', 
        'https://amazon.com/testbook', 
        'Someperson', 
        'English', 
        300,  
        'A company', 
        'A Test Book', 1999) 
      RETURNING isbn`);

  book_isbn = result.rows[0].isbn
});

// describe("POST /books", async function () {
//     test("Creates a new book", async function () {
//         const response = await request(app)
//             .post(`/books`)
//             .send({
//             isbn: '2222',
//             amazon_url: "https://testbook.com",
//             author: "Author test",
//             language: "english",
//             pages: 400,
//             publisher: "Me Myself and I",
//             title: "Test Book Post",
//             year: 1990
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body.book).toHaveProperty("isbn");
//     });

//     test("Prevents creating book without required title", async function () {
//         const response = await request(app)
//             .post(`/books`)
//             .send({year: 1990});
//         expect(response.statusCode).toBe(400);
//     });
// });

// describe("GET /books", async function () {
//   test("Gets a list for one book", async function () {
//     const response = await request(app).get(`/books`);
//     const books = response.body.books;
//     expect(books).toHaveLength(1);
//     expect(books[0]).toHaveProperty("isbn");
//     expect(books[0]).toHaveProperty("amazon_url");
//   });
// });

// describe("GET /books/:isbn", async function () {
//   test("Gets a book", async function () {
//     const response = await request(app)
//         .get(`/books/${book_isbn}`)
//     expect(response.body.book).toHaveProperty("isbn");
//     expect(response.body.book.isbn).toBe(book_isbn);
//   });

//   test("Responds with 404 if can't find book", async function () {
//     const response = await request(app)
//         .get(`/books/999`)
//     expect(response.statusCode).toBe(404);
//   });
// });

// describe("PUT /books/:id", async function () {
//   test("Updates a single book", async function () {
//     const response = await request(app)
//         .put(`/books/${book_isbn}`)
//         .send({
//           amazon_url: "https://testbook.com",
//           author: "Author test",
//           language: "english",
//           pages: 400,
//           publisher: "Me Myself and I",
//           title: "New Book Title",
//           year: 1990
//         });
//     expect(response.body.book).toHaveProperty("isbn");
//     expect(response.body.book.title).toBe("New Book Title");
//   });

//   test("Won't allow a bad book update", async function () {
//     const response = await request(app)
//         .put(`/books/${book_isbn}`)
//         .send({
//           isbn: "32794782",
//           badField: "DO NOT ADD ME!",
//           amazon_url: "https://testbook.com",
//           author: "Author test",
//           language: "english",
//           pages: 400,
//           publisher: "Me Myself and I",
//           title: "UPDATED BOOK",
//           year: 1990
//         });
//     expect(response.statusCode).toBe(400);
//   });

//   test("Responds 404 if can't find book", async function () {
//     // delete book first
//     await request(app)
//         .delete(`/books/${book_isbn}`)
//     const response = await request(app).delete(`/books/${book_isbn}`);
//     expect(response.statusCode).toBe(404);
//   });
// });

afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
  await db.end()
});