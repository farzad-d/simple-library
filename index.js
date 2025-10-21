let myLibrary = [];

class Book {
  id = crypto.randomUUID();

  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }

  changeStt() {
    this.readState = !this.readState;
  }
}

function addBookToLibrary(title, author, pages, readState) {
  let book = new Book(title, author, pages, readState);
  myLibrary.push(book);
}

addBookToLibrary("War and Peace", "Leo Tolstoy", 1200, false);
addBookToLibrary("Animal Farm", "George Orwell", 110, true);
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 998, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 352, true);
addBookToLibrary("Wuthering Heights", "Emily Brontë", 252, true);
addBookToLibrary("Little Women", "Louisa May Alcott", 282, false);
// console.log(myLibrary);

function truncText(str) {
  if (str.length > 20) {
    return str.slice(0, 20) + "...";
  } else {
    return str;
  }
}

const cards = document.querySelector("#cards");

function cardCreator(bookTitle, bookAuthor, bookPages, bookState, bookId) {
  const card = document.createElement("section");
  card.dataset.id = bookId;
  card.classList.add("card");
  if (bookState) card.classList.add("readBgColor");

  const title = document.createElement("h3");
  title.textContent = `Title: ${truncText(bookTitle)}`;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${truncText(bookAuthor)}`;
  card.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = `Pages: ${truncText(bookPages)}`;
  card.appendChild(pages);

  const state = document.createElement("p");
  state.textContent = `Read: ${bookState ? "✅" : "❌"}`;
  card.appendChild(state);

  const cardBtns = document.createElement("div");
  cardBtns.classList.add("card-btns");
  card.appendChild(cardBtns);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  cardBtns.appendChild(delBtn);
  delBtn.addEventListener("click", () => {
    myLibrary = myLibrary.filter((book) => card.dataset.id !== book.id);
    displayLibrary(myLibrary);
  });

  const sttBtn = document.createElement("button");
  sttBtn.textContent = bookState ? "Mark as Unread" : "Mark as Read";
  cardBtns.appendChild(sttBtn);
  sttBtn.addEventListener("click", () => {
    myLibrary.find((book) => {
      if (card.dataset.id === book.id) book.changeStt();
    });
    displayLibrary(myLibrary);
  });

  cards.appendChild(card);
}

function displayLibrary(library) {
  // document.getElementById("cards").innerHTML = "";
  document.getElementById("cards").replaceChildren();
  for (const book of library) {
    cardCreator(book.title, book.author, book.pages, book.readState, book.id);
  }
}

displayLibrary(myLibrary);

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const inputs = [titleInput, authorInput, pagesInput];

const messages = {
  title: "The title must be filled!",
  author: "The author name must be filled!",
  pages: "The pages must be filled!",
};

inputs.forEach((input) => {
  input.addEventListener("invalid", () => {
    if (input.validity.valueMissing) {
      input.setCustomValidity(messages[input.id]);
    } else {
      input.setCustomValidity("");
    }
  });

  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
});

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const ttl = formData.get("title");
  const auth = formData.get("author");
  const pg = formData.get("pages");
  const stt = formData.get("state") !== null;

  addBookToLibrary(ttl, auth, pg, stt);
  displayLibrary(myLibrary);
  dialog.close();
});

const addBookBtn = document.querySelector("#add-book");
const closeDialogBtn = document.querySelector(".close-btn");
dialog.addEventListener("close", () => form.reset());
addBookBtn.addEventListener("click", () => dialog.showModal());
closeDialogBtn.addEventListener("click", () => dialog.close());
