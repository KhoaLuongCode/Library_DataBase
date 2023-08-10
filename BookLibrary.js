let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book (titleOfTheBook, authorOfTheBook,numberOfPages, haveRead, rating){
    this.titleOfTheBook = titleOfTheBook;
    this.authorOfTheBook = authorOfTheBook;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
    this.rating = rating;
}

const addMeBook = document.getElementById("addMeButton")

addMeBook.addEventListener("click", addBookToTheLibrary)

function addBookToTheLibrary(){

    const titleOfTheBook = document.getElementById("form1").value;
    const authorOfTheBook = document.getElementById("form2").value;
    const numberOfPages = document.getElementById("form3").value;
    const haveRead = document.getElementById("form4").value;
    const rating = document.getElementById("form5").value;

    if (!titleOfTheBook || !authorOfTheBook || !numberOfPages || !haveRead || !rating) {
        alert("Please fill in all the fields before adding the book.");
        return;
    }

    if (haveRead !== "Yes" && haveRead !== "No") {
        alert("Please enter either 'Yes' or 'No' for 'Have you read the book?'");
        return;
    }

    if (rating < 0){
        alert("Please enter something greater than 0")
        return;
    }
    if (rating > 5){
        alert("Please only rate the book from 1 to 5")
        return;
    }

    let addBook = new Book(titleOfTheBook, authorOfTheBook, numberOfPages, haveRead, rating)
    myLibrary.push(addBook)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    displayBooks()

    //resets
    document.getElementById("form1").value = '';
    document.getElementById("form2").value = '';
    document.getElementById("form3").value = '';
    document.getElementById("form4").value = '';
    document.getElementById("form5").value = '';
}

const displayBook = document.getElementById("displayBook")

function displayBooks() {
    displayContainer.innerHTML = ""; // Clear previous content

    myLibrary.forEach((book, index) => {
        const displayContainer = document.getElementById("displayContainer");
        const bookDiv = document.createElement("div");


        bookDiv.classList.add("bookContainer");

        bookDiv.innerHTML = `
            <p> <strong> Title: </strong> ${book.titleOfTheBook}</p>
            <p> <strong> Author: </strong> ${book.authorOfTheBook}</p>
            <p> <strong> Pages: </strong> ${book.numberOfPages}</p>
            <p> <strong> Read: </strong> ${book.haveRead}</p>
            <p> <strong> Rating: </strong> ${book.rating} </p>
        `;


        // create button right inside javascript
        const readButton = document.createElement("button")
        readButton.textContent = book.haveRead === "Yes" ? "Mark Unread" : "Mark Read";
        readButton.addEventListener("click", () => readStatus(index));
        bookDiv.appendChild(readButton);

        readButton.classList.add("haveReadButton")

        // create a removed button
        const removeButton = document.createElement("button")
        removeButton.textContent = "Remove the book";
        removeButton.addEventListener("click", () => deleteBook(index));
        bookDiv.appendChild(removeButton);

        removeButton.classList.add("removeBookButton")

        displayContainer.appendChild(bookDiv);
    });
}


displayBook.addEventListener("click", displayBooks)


function readStatus(index){
    myLibrary[index].haveRead = myLibrary[index].haveRead === "Yes" ? "No" : "Yes";
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    displayBooks();
}

function deleteBook(index){
    myLibrary.splice(index, 1)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    displayBooks()
}
