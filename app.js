// document initial loading -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', loadContent)



function loadContent() {

    let storage = getStorage();


    storage.forEach(item => {
        addItem(item.name, item.place, item.tel)
    })

}




// Add new item onclick ------------------------------------------------------------------

const addButton = document.getElementById('add-btn')

addButton.onclick = addToStorage;




// interface section -----------------------------------------------------------------------

// display the messages


const message = document.querySelector('.message');

function messageDisplay(color, text) {
    

    message.style.display = 'block'
    message.style.backgroundColor = color
    message.innerText = text

    setTimeout(fade, 3000)
}

function fade() {

    message.style.display = 'none'
}



// add an item to the interface

function addItem(userName, place, tel) {

    let newNumber = document.createElement('tr')

    newNumber.innerHTML = `
        <td>${userName}</td>
        <td>${place}</td>
        <td>${tel}<i class="bi bi-trash3-fill"></i></td>
        `

    const table = document.getElementById('table')

    table.append(newNumber)

    removeItem()

}

// clear the inputs

function clearContent() {
    document.getElementById('name').value = ''
    document.getElementById('place').value = ''
    document.getElementById('tel').value = ''

}

// Delete an item from interface

function removeItem() {
    const deleteButtons = document.querySelectorAll('.bi-trash3-fill')
    deleteButtons.forEach(button => {
        button.onclick = (e)=> {
            let clicked = e.target;

            removeFromStorage(clicked.parentElement.innerText)

            clicked.parentElement.parentElement.remove();

            messageDisplay('grey', 'Success: Item Deleted')

        }
    })
}




// storage section ------------------------------------------------------------------

// add an item to the local storage

function addToStorage() {

    
    let name = document.getElementById('name').value.trim();
    let place = document.getElementById('place').value.trim();
    let tel = document.getElementById('tel').value.trim();

    let storage = getStorage();

    let num;
    let savedName;

    storage.forEach(item => {
        num = item.tel
        savedName = item.name
        
    })
    

    if(name == '' || place == '' || tel == '') {

        
        messageDisplay('red', 'Error: Please fill all the boxes')
        
    } else if(num == tel){
        

        messageDisplay('red', `Warning: Book ${savedName} with ISBN ${num} is already saved`)
        clearContent()

        
    } else {
        storage.push({
            name: name,
            place: place,
            tel: tel
        })
    
        localStorage.setItem('storage', JSON.stringify(storage))

        addItem(name, place, tel)

        clearContent()

        messageDisplay('green', 'Success: Book Added')
    }

    
}

function getStorage() {
    let list;
    let stored = JSON.parse(localStorage.getItem('storage'))

    if(stored) {
        list = stored;
    } else {
        list = []
    }

    return list
}

// remove an item to the local storage

function removeFromStorage(num) {
    let storage = JSON.parse(localStorage.getItem('storage'))

    const indexOfObject = storage.findIndex(item => {
        return item.tel === num;
      });
      
    storage.splice(indexOfObject, 1)
      
    localStorage.setItem('storage', JSON.stringify(storage))
}


