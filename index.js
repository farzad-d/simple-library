let myLibrary = [];

function Book(title, author, pages, readState) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readState = readState;
}

function addBookToLibrary(title, author, pages, readState) {
  let book = new Book(title, author, pages, readState);
  myLibrary.push(book);
}

addBookToLibrary("Animal Farm", "George Orwell", 110, true);
addBookToLibrary("Wuthering Heights", "Emily Brontë", 252, true);
addBookToLibrary("Little Women", "Louisa May Alcott", 282, false);
// console.log(myLibrary);

const cards = document.querySelector("#cards");

function cardCreator(bookTitle, bookAuthor, bookPages, bookState, bookId) {
  const card = document.createElement("section");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = `Title: ${bookTitle}`;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${bookAuthor}`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `Pages: ${bookPages}`;
  card.appendChild(pages);

  const state = document.createElement("p");
  state.textContent = `Read: ${bookState}`;
  card.appendChild(state);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Del";
  delBtn.dataset.id = bookId;
  card.appendChild(delBtn);
  delBtn.addEventListener("click", (event) => {
    const bookIdToRemove = event.currentTarget.dataset.id;
    myLibrary = myLibrary.filter((book) => bookIdToRemove != book.id);
    displayLibrary(myLibrary);
  });

  cards.appendChild(card);
}

function displayLibrary(library) {
  // document.getElementById("cards").innerHTML = "";
  document.getElementById("cards").replaceChildren();
  for (const book of library) {
    let readUnread = book.readState ? "Read ✅" : "Unread ❌";
    cardCreator(book.title, book.author, book.pages, readUnread, book.id);
  }
}

displayLibrary(myLibrary);

const addBookBtn = document.querySelector("#add-book");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector("dialog > button");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
  document.querySelector("#title").focus();
});
closeDialogBtn.addEventListener("click", () => dialog.close());

const submitBtn = document.querySelector('[type="submit"]');
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const ttl = formData.get("title");
  const auth = formData.get("author");
  const pg = formData.get("pages");
  const stt = formData.get("state");

  addBookToLibrary(ttl, auth, pg, stt);
  displayLibrary(myLibrary);

  dialog.close();
});
