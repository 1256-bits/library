const books = [];
populateShelf();
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("cancel");
const form = document.querySelector("dialog > form");
const layoutBtn = document.getElementById("layout-button");

class Book {
  constructor(name, author, description, pageCount) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.pageRead = 0;
    this.finished = false;
    this.description = description;
  }

  updateValues = function (data) {
    const pageRead = parseInt(data.get("page-read"));
    const pageCount = parseInt(data.get("page-count"));
    this.name = data.get("name");
    this.author = data.get("author");
    this.pageCount = pageCount;
    this.pageRead = pageRead > pageCount ? pageCount : pageRead;
    this.description = data.get("description");
    if (data.get("finished") === "on" || this.pageRead === this.pageCount)
      this.read();
    else this.finished = false;
  };

  read = function () {
    this.finished = true;
    this.pageRead = this.pageCount;
  };
}
function showInfo(e) {
  const index = e.currentTarget.dataset.index;
  const infoBox = document.querySelector(".info-wrapper");
  infoBox.innerHTML = `
    <form method="get">
    <input type="hidden" name="index" value="${index}" id="index-hidden">
    <ul>
      <li>
        <label class="fw-bold" for="bar-name">Title:</label>
        <input type="text" value="${
          books[index].name
        }" name="name" id="bar-name" required />
      </li>
      <li>
        <label class="fw-bold" for="bar-author" >Author:</label>
        <input value="${
          books[index].author
        }" name="author" id="bar-author" required />
      </li>
      <li class="column">
        <label class="fw-bold" for="bar-description" >Description:</label>
        <textarea name="description" id="bar-description" rows="10" >${
          books[index].description
        }</textarea>
      </li>
      <li>
        <label for="finished" class="fw-bold">Finised: </label>
        <input type="checkbox" name="finished" id="finished" ${
          books[index].finished ? "checked" : ""
        }>
      </li>
      <li>
        <label class="fw-bold" for="bar-page-count" >Pages:</label>
        <input type="number" min="1" value="${
          books[index].pageCount
        }" name="page-count" id="bar-page-count" required />
      </li>
      <li>
        <label class="fw-bold" for="bar-page-read" >Pages read:</label>
        <input type="number" min="0" value="${
          books[index].pageRead
        }" name="page-read" id="bar-page-read" required />
      </li>
    <button class="sidebar-button button-confirm bg-secondary" id="save-changes">Save changes</button>
    <button class="sidebar-button button-cancel bg-secondary" type="button" id="delete-book">Delete book</button>
    </ul
    <form>
    `;
  const saveChanges = document.querySelector(".info-wrapper form");
  const pageRead = document.getElementById("bar-page-read");
  const deleteBtn = document.getElementById("delete-book");
  saveChanges.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    books[data.get("index")].updateValues(data);
    populateShelf();
    e.target.remove();
  });
  pageRead.addEventListener("blur", (e) => {
    const pageCount = document.getElementById("bar-page-count");
    if (e.target.value > pageCount.value) e.target.value = pageCount.value;
  });
  deleteBtn.addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    const index = document.getElementById("index-hidden").value;
    books.splice(index, 1);
    populateShelf();
    const sidebarForm = document.querySelector(".info-wrapper form");
    sidebarForm.remove();
  });
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
         <svg class="image image-done ${book.finished ? "" : "hidden"}">
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
       <p class="progress">${Math.trunc(
         (book.pageRead / book.pageCount) * 100,
       )}%</p>`;

    const bookCard = document.createElement("div");
    bookCard.classList.add("card", "bg-secondary");
    bookCard.innerHTML = bookCardTemplate;
    bookCard.setAttribute("tabindex", "0");
    bookCard.setAttribute("data-index", index);
    bookCard.addEventListener("click", showInfo);
    bookCard.addEventListener("keyup", (e) => {
      if (e.code === "Space") showInfo(e);
    });
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
  addBookCard.setAttribute("tabindex", "0");
  shelf.appendChild(addBookCard);
  addBookCard.addEventListener("click", () => {
    dialog.showModal();
    form.reset();
  });
  addBookCard.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      dialog.showModal();
      form.reset();
    }
  });
}

layoutBtn.addEventListener("click", () => {
  const shelf = document.querySelector(".books");
  shelf.classList.toggle("line-layout");
  shelf.classList.toggle("card-layout");
});
