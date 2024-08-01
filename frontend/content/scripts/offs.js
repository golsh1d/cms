let mainUrl = `http://localhost:3000/api/`
let emptyErrBox = document.querySelector('.empty-err')
let offsTableBody = document.querySelector('.offs-table-body')
let deleteModalWrapper = document.querySelector('.delete-modal-wrapper')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')

function showAllOffs() {
    fetch(`${mainUrl}offs/`)
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErrBox.style.display = 'none'
            offsTableBody.innerHTML = ''
            data.forEach(obj => {
                offsTableBody.insertAdjacentHTML(`beforeend` , 
                `<tr class="cms-table-tr">
                        <td class="xs-w-50 s-w-60 md-w-100">${obj.code}</td>
                        <td class="xs-w-50 s-w-60 md-w-100">${obj.percent}</td>
                        <td class="xs-w-50 s-w-60 md-w-100 xs-hidden s-block">${obj.date}</td>
                        <td class="xs-w-50 s-w-60 md-w-100 xs-hidden s-block">${obj.adminId}</td>
                        <td class="xs-w-50 s-w-60 md-w-100">${obj.productId}</td>
                        <td class="offs-table-details xs-w-60 s-w-60 md-w-100">
                            <button class="cms-table-btn" onclick="showDeleteModal(${obj.id})">حذف</button>
                            <button class="cms-table-btn">تایید</button>
                        </td>
                    </tr>`
                )
            })
        } else {
            emptyErrBox.style.display = 'block'
            offsTableBody.innerHTML = ''
        }
    })
}

//show delete modal
function showDeleteModal(id) {
    deleteModalWrapper.classList.add('active')
    deleteModalNoBtn.addEventListener('click' , () => {
        deleteModalWrapper.classList.remove('active')
        location.reload()
    })
    deleteModalYesBtn.addEventListener('click' , async () => {
        try {
            let res = await fetch(`${mainUrl}offs/${id}` , {
                method : 'DELETE',
                headers : {
                    'Content-type' : 'application/json'
                },
            })
            console.log(res)
            deleteModalWrapper.classList.remove('active')
            showAllOffs()
        } catch (error) {
            console.log(error);
        }
    })
}

//hide delete modal
function hideDeleteModal(event) {
    if (event.target.classList[1] === 'delete-modal-wrapper') {
        deleteModalWrapper.classList.remove('active')
        location.reload()
    }
}

function hideDeleteModalwithKey(event) {
    if(event.key === 'Escape') {
        deleteModalWrapper.classList.remove('active')
        location.reload()
    }
}

//events
window.addEventListener('load' , showAllOffs)
window.addEventListener('click' , hideDeleteModal)
window.addEventListener('keydown' , hideDeleteModalwithKey)