const btnE1 = document.getElementById("btn");
const appE1 = document.getElementById("app");

// Load existing notes on page load
getNotes().forEach((note) => {
    const noteE1 = createNoteE1(note.id, note.content, note.color, note.timestamp, note.additionalData);
    appE1.insertBefore(noteE1, btnE1);
});

function createNoteE1(id, content, color, timestamp, additionalData) {
    const element = document.createElement("div");
    element.classList.add("note");
    
    // Create a container div for text content and timestamp
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");

    // Create a textarea for the text content
    const contentElement = document.createElement("textarea");
    contentElement.classList.add("content");
    contentElement.value = content;
    contentElement.rows = 10; // Set the number of rows
    contentElement.style.width = "100%"; // Set the width to 100%
    contentContainer.appendChild(contentElement);

    // Create a div for the timestamp
    const timestampElement = document.createElement("div");
    timestampElement.classList.add("timestamp");
    timestampElement.textContent = formatTimestamp(timestamp);
    contentContainer.appendChild(timestampElement);

    // Create a div for additional data
    const additionalDataElement = document.createElement("div");
    additionalDataElement.classList.add("additional-data");
    additionalDataElement.textContent = additionalData || "";
    element.appendChild(additionalDataElement);

    // Set background color for the note
    element.style.backgroundColor = color;

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?");
        if (warning) {
            deleteNote(id, element);
        }
    });

    // Add an input event listener to update the note content
    contentElement.addEventListener("input", () => {
        updateNote(id, contentElement.value, additionalData);
    });

    // Append the content container to the note
    element.appendChild(contentContainer);

    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNote(notes);

    // Remove the element from the DOM
    element.remove();
}

function updateNote(id, content, additionalData) {
    const notes = getNotes();
    const target = notes.find((note) => note.id === id);
    if (target) {
        target.content = content;
        target.timestamp = getCurrentTimestamp();
        target.additionalData = additionalData; // Add or update additional data
        saveNote(notes);
    }
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: generateUniqueId(),
        content: "",
        color: getRandomColor(),
        timestamp: getCurrentTimestamp(),
        additionalData: "",
    };
    const noteE1 = createNoteE1(noteObj.id, noteObj.content, noteObj.color, noteObj.timestamp, noteObj.additionalData);

    // Append the new note element to the container
    appE1.insertBefore(noteE1, btnE1);

    notes.push(noteObj);
    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function generateUniqueId() {
    return Math.floor(Math.random() * 100000);
}

function getCurrentTimestamp() {
    return new Date().getTime();
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

btnE1.addEventListener("click", addNote);

