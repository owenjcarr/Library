class Book {
    constructor(title,author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let b1 = new Book('American Pastoral', 'Philip Roth', 423, false);
let b2 = new Book('Dune', 'Frank Herbert', 497, false);

let myLibrary = [
    b1,
    // b2
];

const populateStorage = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
  
const getStorage = () => {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    displayBooksTable();
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    // verify all info is entered 
    if (title.length === 0 || author.length === 0 || pages.length === 0) {
        alert("Enter all book info");
    }
    else {
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);

        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").checked = false;

        document.getElementById("form-container").style.display="none";
        
        populateStorage();
        displayBooksTable();
    }
}

function displayBooksTable() {
    let table = document.getElementById("shelf");

    while(table.rows.length > 1) {
        table.deleteRow(-1);
    }

    // generates a row for book in myLibrary
    myLibrary.forEach(book => {

        let row = table.insertRow(-1);

        // book info
        let title = row.insertCell(0);
        title.innerHTML = book.title;
        let author = row.insertCell(1);
        author.innerHTML = book.author
        let pages = row.insertCell(2);
        pages.innerHTML = book.pages;
        let read = row.insertCell(3);
        if(book.read) {
            read.innerHTML = "Yes";
        }
        else {
            read.innerHTML = "No";
        }

        // delete book button
        let deleteBookBtn = row.insertCell(4);
        let dBtn = document.createElement("button");
        dBtn.innerHTML = "Delete Book";
        dBtn.addEventListener('click', e => {
            myLibrary.splice(myLibrary.indexOf(book),1);
            displayBooksTable();
            populateStorage();
        });
        deleteBookBtn.append(dBtn);

        // change read status button
        let readBtn = row.insertCell(5);
        let rBtn = document.createElement("button");
        rBtn.innerHTML = "Read";
        rBtn.addEventListener('click', e => {
            book.read = !book.read;
            displayBooksTable();
        });
        readBtn.append(rBtn);

    });
}

function openForm() {
    document.getElementById("form-container").style.display="flex";
}

if(!localStorage.getItem('library')) {
    populateStorage();
} else {
    getStorage();
}

