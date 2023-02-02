let noteList;

if (window.location.pathname === "/recently-deleted") {
  noteList = document.querySelectorAll(".list-container .list-group");
}

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch("/api/recently-deleted", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const recoverNote = (id) =>
  fetch(`/api/recently-deleted/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

const handleNoteRecover = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const confirmDelete = confirm("Are you sure you want to recover this note?");
  if (!confirmDelete) {
    return;
  }

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  console.log(noteId);

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  recoverNote(noteId).then(() => {
    getAndRenderNotes();
  });
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/recently-deleted") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createDiv = (text, delBtn = true) => {
    const divEl = document.createElement("div");
    divEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    // spanEl.addEventListener("click", handleNoteView);

    divEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fas",
        "fa-undo-alt",
        "float-right",
        "text-danger",
        "delete-note"
      );
      delBtnEl.addEventListener("click", handleNoteRecover);

      divEl.append(delBtnEl);
    }

    return divEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createDiv("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createDiv(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/recently-deleted") {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

getAndRenderNotes();
