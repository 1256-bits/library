const books = [];

function Book(name, author, description, pageCount) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.pageRead = 0;
    this.finished = false;
    this.description = description;
}

const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("cancel");
const openBtn = document.getElementById("new-book");
const form = document.querySelector("dialog > form");

openBtn.addEventListener("click", () => {
    dialog.showModal();
    form.reset();
});

closeBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", () => {
    const name = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const pageCount = document.getElementById("page-count").value;
    const book = new Book(name, author, description, pageCount);
    books.push(book);
});
