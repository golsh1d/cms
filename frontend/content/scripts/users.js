let mainUrl = 'http://localhost:3000/api/'
let usersTableBody = document.querySelector('.users-table-body')
let emptyErrBox = document.querySelector('.empty-err')
let deleteModalWrapper = document.querySelector('.delete-modal-wrapper')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')

function showAllUsers() {
    fetch(`${mainUrl}users/`)
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErrBox.style.display = 'none'
            usersTableBody.innerHTML = ''
            data.forEach(obj => {
                usersTableBody.insertAdjacentHTML(`beforeend`,
                    `<tr class="cms-table-tr">
                        <td class="xs-w-60 s-w-70 md-w-100 xs-hidden s-block">${obj.firstName}</td>
                        <td class="xs-w-60 s-w-70 md-w-100">${obj.lastName}</td>
                        <td class="xs-w-60 s-w-70 md-w-100">${obj.password}</td>
                        <td class="xs-w-60 s-w-70 md-w-100">${obj.phone}</td>
                        <td class="xs-w-60 s-w-70 md-w-100 xs-hidden s-block">${obj.email}</td>
                        <td class="xs-w-60 s-w-70 md-w-100 user-table-details">
                            <button class="cms-table-btn" onclick="showDeleteModal(${obj.id})">حذف</button>
                            <button class="cms-table-btn">جزئیات</button>
                            <button class="cms-table-btn">ویرایش</button>
                        </td>
                    </tr>`
                )
            })
        } else {
            emptyErrBox.style.display = 'block'
            usersTableBody.innerHTML = ''
        }
    })
}

// show delete modal
function showDeleteModal(id) {
    deleteModalWrapper.classList.add('active')
    deleteModalNoBtn.addEventListener('click' , () => {
        deleteModalWrapper.classList.remove('active')
    })
    deleteModalYesBtn.addEventListener('click' , async () => {
        try {
            let res = await fetch(`${mainUrl}users/${id}` , {
                method : 'DELETE',
                headers : {
                    'Contenet-type' : 'application/json'
                },
            })
            console.log(res)
            deleteModalWrapper.classList.remove('active')
            showAllUsers()
        } catch (error) {
            console.log(error);
        }
    })
}

// hide delete modal
function hideDeleteModal(event) {
    if (event.target.classList[1] === 'delete-modal-wrapper') {
        deleteModalWrapper.classList.remove('active')
    }
}

function hideDeleteModalWithKey(event) {
    if (event.key === 'Escape') {
        deleteModalWrapper.classList.remove('active')
    }
}

// events
window.addEventListener('load' , showAllUsers)
window.addEventListener('click', hideDeleteModal)
window.addEventListener('keydown', hideDeleteModalWithKey)