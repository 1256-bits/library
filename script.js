const books = [];
populateShelf();
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("cancel");
const form = document.querySelector("dialog > form");

function Book(name, author, description, pageCount) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.pageRead = 0;
    this.finished = false;
    this.description = description;
}

function showInfo() {
    const index = this.dataset.index;
    const sideBar = document.querySelector(".sidebar");
    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    infoBox.innerHTML = `<p>Title: ${books[index].name}</p>
    <p>Author: ${books[index].author}</p>`;
    sideBar.appendChild(infoBox);
}

closeBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", () => {
    const name = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const pageCount = document.getElementById("page-count").value;
    const book = new Book(name, author, description, pageCount);
    books.push(book);
    populateShelf();
});

function populateShelf() {
    const shelf = document.querySelector(".books");
    shelf.innerHTML = "";
    books.forEach((book, index) => {
        const bookCardTemplate = `
       <div class="image-wrapper" >
         <svg class="image image-done hidden">
           <use class="image image-done" href="./done.svg#done"></use>
         </svg>
         <svg class="image book-icon">
           <use class="image" href="./book-icon.svg#book-icon"></use>
         </svg>
       </div>
       <p class="title fw-bold">
            ${book.name}
       </p>
       <p class="author">${book.author}</p>
       <p class="pages">${book.pageRead}/${book.pageCount}</p>
       <p class="progress">${(book.pageRead / book.pageCount) * 100}%</p>`;

        const bookCard = document.createElement("div");
        bookCard.classList.add("card", "bg-secondary");
        bookCard.innerHTML = bookCardTemplate;
        //bookCard.setAttribute("tabindex", "0");
        bookCard.setAttribute("data-index", index);
        bookCard.addEventListener("click", showInfo);
        shelf.appendChild(bookCard);
    });
    const addBookCardTemplate = `
        <svg class="image add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>plus</title>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>`;
    const addBookCard = document.createElement("div");
    addBookCard.setAttribute("id", "new-book");
    addBookCard.classList.add("add-book");
    addBookCard.innerHTML = addBookCardTemplate;
    shelf.appendChild(addBookCard);
    addBookCard.addEventListener("click", () => {
        dialog.showModal();
        form.reset();
    });
}
