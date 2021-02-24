showNotes();
const title = document.querySelector("#title");
const textArea = document.querySelector("#note-text");
const button = document.querySelector(".note-btn");
button.addEventListener("click", function (e) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: title.value,
        textArea: textArea.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textArea.value = '';
    showNotes();
});

function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {
            html += `
        <div>
        <div class="card">
            <h2>${element.title} </h2>
            <p>${element.textArea}</p>
            <button onClick="deleteNote(this.id)" id="${index}">Delete Note</button>
        </div>
        </div>`;
    });

    const insertNotes = document.getElementById("notes");
    if (notesObj.length == 0) {
        insertNotes.innerHTML = `Nothing to show! Please click on "Add a Note" button to add a new note.`
    } else {
        insertNotes.innerHTML = html;
    }
}


function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value;
    console.log("input event fired", inputVal);
    let cards = document.getElementsByClassName("card");
    Array.from(cards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerHTML;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})

