const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }

    toggleRead() {
        this.read = !this.read;
    }
}
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const container = document.getElementById("library-container");
    container.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        titleDiv.textContent = `Title: ${book.title}`;

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("author");
        authorDiv.textContent = `Author: ${book.author}`;

        const pagesDiv = document.createElement("div");
        pagesDiv.classList.add("pages");
        pagesDiv.textContent = `Pages: ${book.pages}`;

        const readDiv = document.createElement("div");
        readDiv.classList.add("read");
        readDiv.textContent = `Read: ${book.read ? "Yes" : "No"}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = book.id;
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        });

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.dataset.id = book.id;
        toggleBtn.addEventListener("click", () => {
            const targetBook = myLibrary.find(b => b.id === book.id);
            if (targetBook) {
                targetBook.toggleRead();
                displayBooks();
            }
        });
        bookCard.appendChild(titleDiv);
        bookCard.appendChild(authorDiv);
        bookCard.appendChild(pagesDiv);
        bookCard.appendChild(readDiv);
        bookCard.appendChild(removeBtn);
        bookCard.appendChild(toggleBtn);

        container.appendChild(bookCard);
    });
}
const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
    if (newBookForm.style.display === "none") {
        newBookForm.style.display = "block";
    } else {
        newBookForm.style.display = "none";
    }
});

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    newBookForm.reset();
    newBookForm.style.display = "none";
});


displayBooks();
