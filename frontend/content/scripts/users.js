let mainUrl = 'http://localhost:3000/api/'
let usersTableBody = document.querySelector('.users-table-body')
let emptyErrBox = document.querySelector('.empty-err')
let deleteModalWrapper = document.querySelector('.delete-modal-wrapper')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')
let detailModalWrapper = document.querySelector('.detail-modal-wrapper')
let detailModalBody = document.querySelector('.detail-modal-body')
let editModalWrapper = document.querySelector('.edit-user-info-modal-wrapper')
let editModalBtn = document.querySelector('.edit-user-info-modal-btn')
let editModalNameInput = document.querySelector('.edit-modal-name-input')
let editModalFNameInput = document.querySelector('.edit-modal-fname-input')
let editModalUserNameInput = document.querySelector('.edit-modal-user-name-input')
let editModalPasswordInput = document.querySelector('.edit-modal-password-input')
let editModalPhoneInput = document.querySelector('.edit-modal-phone-input')
let editModalEmailInput = document.querySelector('.edit-modal-email-input')
let editModalCityInput = document.querySelector('.edit-modal-city-input')
let editModalAddressInput = document.querySelector('.edit-modal-address-input')
let editModalScoreInput = document.querySelector('.edit-modal-score-input')
let editModalBuyInput = document.querySelector('.edit-modal-buy-input')

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
                            <button class="cms-table-btn" onclick="showDetailModal(${obj.buy},${obj.score}, '${obj.city}')">جزئیات</button>
                            <button class="cms-table-btn" onclick="showEditModal(${obj.id} , '${obj.firstName}' , '${obj.lastName}' , '${obj.userName}' , '${obj.password}' , ${obj.phone} , '${obj.email}' , '${obj.city}' , '${obj.address}' , ${obj.score} , ${obj.buy})">ویرایش</button>
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

//show detail modal
function showDetailModal(buy , score , city) {
    detailModalWrapper.classList.add('active')
    detailModalBody.insertAdjacentHTML(`beforeend` , 
        `<tr class="cms-detail-table-tr">
            <td class="xs-w-60 s-w-70">${city}</td>
            <td class="xs-w-60 s-w-70">${buy}تومان</td>
            <td class="xs-w-60 s-w-70">${score}</td>
        </tr>`
    )
}

// hide detail modal
function hideDetailModal(event) {
    if (event.target.classList[1] === 'detail-modal-wrapper') {
        detailModalWrapper.classList.remove('active')
    }
}

function hideDetailModalWithKey(event) {
    if (event.key === 'Escape') {
        detailModalWrapper.classList.remove('active')
    }
}

// show edit modal
function showEditModal(id , firstName , lastName , userName , password , phone , email , city , address , score , buy) {
    editModalWrapper.classList.add('active')
    editModalNameInput.value = firstName 
    editModalFNameInput.value = lastName
    editModalUserNameInput.value = userName
    editModalPasswordInput.value = password
    editModalPhoneInput.value = phone
    editModalEmailInput.value = email
    editModalCityInput.value = city
    editModalAddressInput.value = address
    editModalScoreInput.value = score
    editModalBuyInput.value = buy   
    editModalBtn.addEventListener('click' , async () => {
        let editedUserInfoObj = {
            firstName : editModalNameInput.value ,
            lastName : editModalFNameInput.value, 
            userName : editModalUserNameInput.value , 
            password : editModalPasswordInput.value , 
            phone : editModalPhoneInput.value , 
            email : editModalEmailInput.value ,
            city : editModalCityInput.value ,
            address : editModalAddressInput.value ,
            score : editModalScoreInput.value ,
            buy :  editModalBuyInput.value ,
        }
        try {
            let res = await fetch(`${mainUrl}users/${id}` , {
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(editedUserInfoObj)
            })
            console.log(res)
            showAllUsers()
        } catch (error) {
            console.log(error);
        }
    })
}

// hide edit modal
function hideEditModal(event) {
    if(event.target.classList[1] === 'edit-user-info-modal-wrapper'){
        editModalWrapper.classList.remove('active')
    }
}

function hideEditModalWithKey(event) {
    if(event.key === 'Escape') {
        editModalWrapper.classList.remove('active')
    }
}

// events
window.addEventListener('load' , showAllUsers)
window.addEventListener('click', hideDeleteModal)
window.addEventListener('keydown', hideDeleteModalWithKey)
window.addEventListener('click', hideDetailModal)
window.addEventListener('keydown', hideDetailModalWithKey)
window.addEventListener('click', hideEditModal)
window.addEventListener('keydown', hideEditModalWithKey)