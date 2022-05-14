console.log("This is Project 2!");
showTable();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

function showTable(book) {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    let tableBody = document.getElementById("tableBody");
    let displayString = "";
    booksObj.forEach(element => {

        displayString += `<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            </tr>`
    });
    // tableBody.innerHTML = displayString;
    if (booksObj.length != 0) {
        tableBody.innerHTML = displayString;
    } else {
        tableBody.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

class Display {

    // add(book) {
    //     let notes = localStorage.getItem("notes");
    //     if (notes == null) {
    //         notesObj = [];
    //     } else {
    //         notesObj = JSON.parse(notes);
    //     }
    //     let tableBody = document.getElementById("tableBody");
    //     let displayString;
    //     notesObj.forEach(element => {

    //         displayString += `<tr>
    //         <td>${element.name}</td>
    //         <td>${element.author}</td>
    //         <td>${element.type}</td>
    //         </tr>`
    //     });
    //     tableBody.innerHTML = displayString;
    // }

    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 3 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML += `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}: </strong> ${displayMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

    }

}

let libraryForm = document.getElementById('libraryForm');
// libraryForm.addEventListener('submit', libraryFormSubmit);
libraryForm.addEventListener('submit', function (e) {
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let type;
    let Programming = document.getElementById('Programming');
    let Cooking = document.getElementById('Cooking');
    let Comic = document.getElementById('Comic');


    if (Programming.checked) {
        type = Programming.value;
    }
    else if (Cooking.checked) {
        type = Cooking.value;
    }
    else if (Comic.checked) {
        type = Comic.value;
    }
    else {
        display.show('danger', 'Sorry you cannot add this book');
        return false;
    }

    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }

    // let myObj = {
    //     name: name,
    //     author: author,
    //     type: type
    // };
    let book = new Book(name, author, type);
    booksObj.push(book);

    localStorage.setItem("books", JSON.stringify(booksObj));

    let display = new Display();

    if (display.validate(book)) {

        // display.add(book);
        showTable()
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else if (type == false) {
        display.show('danger', 'Sorry you cannot add this book');
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
})