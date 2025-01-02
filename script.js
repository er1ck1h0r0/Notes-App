const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.webp";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P" && e.target.isContentEditable) {
        e.target.onkeyup = function () {
            updateStorage();
        };
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let br = document.createElement("br");
        range.insertNode(br);
        range.setStartAfter(br);
    }
});
