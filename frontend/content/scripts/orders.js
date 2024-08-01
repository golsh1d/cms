let mainUrl = `http://localhost:3000/api/`
let emptyErrBox = document.querySelector('.empty-err')
let orderTableBody = document.querySelector('.order-table-body')
let detailModalWrapper = document.querySelector('.detail-modal-wrapper')
let detailModalBody = document.querySelector('.detail-modal-body')
let deleteModalWrapper = document.querySelector('.delete-modal-wrapper')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')
let detailModalBodyPop = document.querySelector('.detail-modal-body-pop')
let detailModalBodySaleCount = document.querySelector('.detail-modal-body-sale-count')
let detailModalBodyCount = document.querySelector('.detail-modal-body-count')

function showAllOrders() {
    fetch(`${mainUrl}orders/`)
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErrBox.style.display = 'none'
            orderTableBody.innerHTML = ''
            data.forEach(obj => {
                orderTableBody.insertAdjacentHTML(`beforeend` , 
                    `<tr class="cms-table-tr">
                        <td class="xs-w-50 s-w-60 md-w-80">${obj.productId}</td>
                        <td class="xs-w-50 s-w-60 md-w-80">${obj.userId}</td>
                        <td class="xs-w-50 s-w-60 md-w-80">${obj.date}</td>
                        <td class="xs-w-50 s-w-60 md-w-80 xs-hidden s-block">${obj.hour}</td>
                        <td class="xs-w-50 s-w-60 md-w-80 xs-hidden s-block">${obj.price} تومان</td>
                        <td class="xs-w-50 s-w-60 md-w-80 xs-hidden s-block">${obj.off} تومان</td>
                        <td class="orders-table-details xs-w-60 s-w-60 md-w-80">
                            <button class="cms-table-btn" onclick="showDetailModal(${obj.popularity} , ${obj.sale_count} , ${obj.count})">جزئیات</button>
                            <button class="cms-table-btn" onclick="showDeleteModal(${obj.id})">حذف</button>
                            <button class="cms-table-btn" onclick="activeOrder(${obj.id})">تایید</button>
                        </td>
                    </tr>`
                )
            })
        } else {
            emptyErrBox.style.display = 'block'
            orderTableBody.innerHTML = ''
        }
    })
}

// show detail modal
function showDetailModal(popularity , saleCount , count) {
    detailModalWrapper.classList.add('active')
    detailModalBodyPop.innerHTML = popularity 
    detailModalBodySaleCount.innerHTML = saleCount
    detailModalBodyCount.innerHTML = count

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

// show delete modal
function showDeleteModal(id) {
    deleteModalWrapper.classList.add('active')
    deleteModalNoBtn.addEventListener('click' , () => {
        deleteModalWrapper.classList.remove('active')
        location.reload()
    })
    deleteModalYesBtn.addEventListener('click' , async () => {
        try {
            let res = await fetch(`${mainUrl}orders/${id}` , {
                method : 'DELETE',
                headers : {
                    'Content-type' : 'application/json'
                },
            })
            console.log(res)
            deleteModalWrapper.classList.remove('active')
            showAllOrders()
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

function hideDeleteModalWithKey(event) {
    if (event.key === 'Escape') {
        deleteModalWrapper.classList.remove('active')
        location.reload()
    }
}

// active order
async function activeOrder(id) {
    try {
        let res = await fetch(`${mainUrl}orders/active-order/${id}/1` , {
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json'
            },
        })
        console.log(res)
        showAllOrders()
    } catch (error) {
        console.log(error);
    }
}

// events
window.addEventListener('load' , showAllOrders)
window.addEventListener('click' , hideDetailModal)
window.addEventListener('keydown' , hideDetailModalWithKey)
window.addEventListener('click' , hideDeleteModal)
window.addEventListener('keydown' , hideDeleteModalWithKey)