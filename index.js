console.log("This is Project 2!");

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

class Display {

    add(book) {

        let tableBody = document.getElementById("tableBody");
        let displayString = `<tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.type}</td>
                            </tr>`
        tableBody.innerHTML += displayString;
    }

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

    let book = new Book(name, author, type);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
})