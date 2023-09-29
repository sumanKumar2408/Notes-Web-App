const addButton = document.querySelector("#add");


const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    console.log(textAreaData);
    const notes = [];
    textAreaData.forEach((note) => {
        notes.push(note.value);
    });
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
};

const notesContainer = document.createElement("div");
notesContainer.classList.add("notes-container");
document.body.appendChild(notesContainer);

const addNewNote = (text = "") => 
{
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
    <div class="operation">
    <button class="edit"> <i class="fas fa-edit"></i> </button> 
    <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>
    <div class="main ${text ? "" : "hidden"}"> </div> 
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    // notesContainer.insertAdjacentHTML("beforebegin", note);
    note.insertAdjacentHTML("afterbegin", htmlData);

    notesContainer.appendChild(note);

    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    // deleting the node
    delButton.addEventListener("click", () => {
        note.remove();
        updateLSData();
    });


    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("change", (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLSData();
    });

    // document.body.appendChild(note);
    // it appeds a node as the last child of a node

    // // getting data back from localStorage
}
addButton.addEventListener("click", () => addNewNote());
const notes = JSON.parse(localStorage.getItem("notes"));
    console.log("get ", notes);
    if (notes) {
        notes.map((note) => addNewNote(note));
}