let commentTableBody = document.querySelector('.comment-table-body')
let emptyErrBox = document.querySelector('.empty-err')
let textModalWrapper = document.querySelector('.text-modal-wrapper')
let textModalBtn = document.querySelector('.text-modal-btn')
let textModalTextArea = document.querySelector('.text-modal-main')
let deleteModalWrapper = document.querySelector('.delete-modal-wrapper')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')
let updateModalWrapper = document.querySelector('.update-modal-wrapper')
let updateModaltextArea = document.querySelector('.update-modal-main')
let updateModalBtn = document.querySelector('.update-modal-btn')

function showAllComments() {
    fetch('http://localhost:3000/api/comments/')
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErrBox.style.display = 'none'
            commentTableBody.innerHTML = ''
            data.forEach(obj => {
                commentTableBody.insertAdjacentHTML(`beforeend` , 
                    `<tr class="cms-table-tr">
                        <td class="xs-w-60 s-w-70 md-w-100">${obj.userId}</td>
                        <td class="xs-w-60 s-w-70 md-w-100">${obj.productId}</td>
                        <td class="xs-w-60 s-w-70 md-w-100">
                            <button class="cms-table-btn" onclick="showCommentText('${obj.body}')">دیدن متن</button>
                        </td>
                        <td class="xs-w-60 s-w-70 md-w-100 xs-hidden s-block">${obj.date}</td>
                        <td class="xs-w-60 s-w-70 md-w-100 xs-hidden s-block">${obj.hour}</td>
                        <td class="comment-table-details xs-w-60 s-w-70 md-w-100">
                            <button class="cms-table-btn" onclick="showDeleteModal(${obj.id})">حذف</button>
                            <button class="cms-table-btn" onclick="acceptComment(${obj.id})">تایید</button>
                            <button class="cms-table-btn">پاسخ</button>
                            <button class="cms-table-btn" onclick="showUpdateModal(${obj.id} , '${obj.body}')">ویرایش</button>
                        </td>
                    </tr>
                    `
                )
            })
        } else {
            emptyErrBox.style.display = 'block'
            commentTableBody.innerHTML = ''
        }
    })
}

// show text modal
function showCommentText(body) {
    textModalWrapper.classList.add('active')
    textModalTextArea.innerHTML = body
    textModalBtn.addEventListener('click' , () => {
        textModalWrapper.classList.remove('active')
    })
}

// hide text modal
function hideTextModal(event) {
    if (event.target.classList[1] === 'text-modal-wrapper') {
        textModalWrapper.classList.remove('active')
    }
}

function hideTextModalwithKey(event) {
    if(event.key === 'Escape') {
        textModalWrapper.classList.remove('active')
    }
}

// show delete modal
function showDeleteModal(id) {
    deleteModalWrapper.classList.add('active')
    deleteModalNoBtn.addEventListener('click' , () => {
        deleteModalWrapper.classList.remove('active')
    })
    deleteModalYesBtn.addEventListener('click' , async () => {
        try {
            let res = await fetch(`http://localhost:3000/api/comments/${id}` , {
                method : 'DELETE' ,
                headers : {
                    'Content-type' : 'application/json'
                },    
            })
            console.log(res)
            deleteModalWrapper.classList.remove('active')
            showAllComments()
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

function hideDeleteModalwithKey(event) {
    if (event.key === 'Escape') {
        deleteModalWrapper.classList.remove('active')
    }
}

// show update modal
function showUpdateModal(id , body) {
    updateModalWrapper.classList.add('active')
    updateModaltextArea.value = body
    updateModalBtn.addEventListener('click' , async () => {
        let editedComment = {
            body : updateModaltextArea.value,
        }
        try {
            let res = await fetch(`http://localhost:3000/api/comments/${id}` , {
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json',
                },
                body : JSON.stringify(editedComment)
            })
            console.log(res)
            updateModalWrapper.classList.remove('active')
            showAllComments()
        } catch (error) {
            console.log(error);
        }
    })
}

// hide update modal
function hideUpdateModal(event) {
    if(event.target.classList[1] === 'update-modal-wrapper') {
        updateModalWrapper.classList.remove('active')
    }
}

function hideUpdateModalwithKey(event) {
    if(event.key === 'Escape') {
        updateModalWrapper.classList.remove('active')
    }
}

// accept comment
function acceptComment(id) {
    fetch(`http://localhost:3000/api/comments/active-comment/${id}/1` , {
        method : 'PUT',
        headers :{
            'Content-type' : 'application/json',
        },
    })
    .then(res => console.log(res))
}

// event
window.addEventListener('load' , showAllComments)
window.addEventListener('click' , hideTextModal)
window.addEventListener('keydown' , hideTextModalwithKey)
window.addEventListener('click' , hideDeleteModal)
window.addEventListener('keydown' , hideDeleteModalwithKey)
window.addEventListener('click' , hideUpdateModal)
window.addEventListener('keydown' , hideUpdateModalwithKey)