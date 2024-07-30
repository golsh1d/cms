let productTablePopularity = document.querySelector('.cms-detail-table-first-td')
let productTableSale = document.querySelector('.cms-detail-table-second-td')
let productTableColors = document.querySelector('.cms-detail-table-third-td')
let detailModal = document.querySelector('.detail-modal-wrapper')
let updateModal = document.querySelector('.update-modal-wrapper')
let deleteModal = document.querySelector('.delete-modal-wrapper')
let productTableBody = document.querySelector('.product-table-body')
let modalElem = document.querySelectorAll('.modal')
let emptyErr = document.querySelector('.empty-err')
let addTitleInput = document.querySelector('.add-product-title')
let addPriceInput = document.querySelector('.add-product-price')
let addCountInput = document.querySelector('.add-product-count')
let addImgInput = document.querySelector('.add-product-img')
let addPopularityInput = document.querySelector('.add-product-popularity')
let addSaleInput = document.querySelector('.add-product-sale')
let addColorInput = document.querySelector('.add-product-color')
let addBtn = document.querySelector('.add-product-btn')
let deleteModalYesBtn = document.querySelector('.delete-modal-yes-btn')
let deleteModalNoBtn = document.querySelector('.delete-modal-no-btn')

// show all products
function showAllProducts() {
    fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErr.style.display = 'none'
            productTableBody.innerHTML = ''
            data.forEach(obj => {
                productTableBody.insertAdjacentHTML(`beforeend`,
                    `<tr class="cms-table-tr">
                            <td class="xs-w-60 s-w-100 xs-hidden s-block product-table-tr-first-td">
                                <img src="${obj.img}" class="cms-table-img" alt="">
                            </td>
                            <td class="xs-w-60 s-w-100 product-table-tr-second-td">${obj.title}</td>
                            <td class="xs-w-60 s-w-100 product-table-tr-third-td">${obj.price}تومان</td>
                            <td class="xs-w-60 s-w-100 product-table-tr-forth-td">${obj.count}عدد</td>
                            <td class="xs-w-60 s-w-100 product-table-tr-fifth-td">
                                <button onclick=showDetail(${obj.id}) class="cms-table-btn product-table-detail-btn">جزئیات</button>
                                <button onclick=showDelete(${obj.id}) class="cms-table-btn product-table-delete-btn">حذف</button>
                                <button onclick=showUpdate(${obj.id}) class="cms-table-btn product-table-update-btn">ویرایش</button>
                            </td>
                        </tr>`
                )
            })
        } else {
            emptyErr.style.display = 'block'
        }
    })
}

// show detail modal
function showDetail(id) {
    detailModal.classList.add('active')
    fetch(`http://localhost:3000/api/products/`)
    .then(res => res.json())
    .then(data => {
        data.forEach(obj => {
            if (obj.id == id) {
                productTablePopularity.innerHTML = obj.popularity                
                productTableSale.innerHTML = obj.sale
                productTableColors.innerHTML = obj.color                
            }
        })
    })
}

// show delete modal
function showDelete(id) {
    deleteModal.classList.add('active')
    deleteModalNoBtn.addEventListener('click' , () => {
        deleteModal.classList.remove('active')
    })
    deleteModalYesBtn.addEventListener('click' , async () => {
        try {
            let res = await fetch(`http://localhost:3000/api/products/${id}` , {
                method : 'DELETE',
                headers : {
                    'Content-type' : 'application/json'
                }
            })
            console.log(res)
            deleteModal.classList.remove('active')
            showAllProducts()
        } catch (error) {
            console.log(error);
        }
    })
}

// hide delete modal
function hideDeleteModal(event) {
    if (event.target.classList[1] === 'delete-modal-wrapper') {
        deleteModal.classList.remove('active')
    }
}

function hideDeleteModalWithKey(event) {
    if(event.key === 'Escape') {
        deleteModal.classList.remove('active') 
    }
}

// show update modal
function showUpdate(id) {
    updateModal.classList.add('active')
}

// hide update modal
function hideUpdate(event) {
    console.log();
    if (event.target.classList[1] === 'update-modal-wrapper') {
        updateModal.classList.remove('active')
    }
}

// send new product info
async function sendData() {
    let productInfoObj = {
        title : addTitleInput.value,
        price : addPriceInput.value,
        count : addCountInput.value,
        img :  addImgInput.value,
        popularity : addPopularityInput.value,
        sale :  addSaleInput.value,
        color : addColorInput.value,
        }
    if (productInfoObj) {
        try {
            let res = await fetch('http://localhost:3000/api/products/' , {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(productInfoObj)
            })
            console.log(res)
            clearInputs()
            showAllProducts()
        } catch (error) {
            console.log(error);
        }
    } 
}

// clear inputs after sending data
function clearInputs() {
    addTitleInput.value = ''
    addPriceInput.value = ''
    addImgInput.value = ''
    addCountInput.value = ''
    addPopularityInput.value = ''
    addColorInput.value = ''
    addSaleInput.value = ''
}

// events
window.addEventListener('load' , showAllProducts)
addBtn.addEventListener('click' , sendData)
window.addEventListener('click' , hideDeleteModal)
window.addEventListener('keydown' , hideDeleteModalWithKey)
window.addEventListener('click' , hideUpdate)