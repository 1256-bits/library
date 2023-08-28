function Book(name, author, description, pageCount) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.pageRead = 0;
    this.finished = false;
    this.description = description;
}

const close = document.getElementById("cancel");
const open = document.getElementById("new-book");
const dialog = document.querySelector("dialog");
open.addEventListener("click", () => dialog.showModal());
