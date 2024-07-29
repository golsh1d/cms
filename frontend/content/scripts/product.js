let productTablePopularity = document.querySelector('.cms-detail-table-first-td')
let productTableSale = document.querySelector('.cms-detail-table-second-td')
let productTableColors = document.querySelector('.cms-detail-table-third-td')
let detailModal = document.querySelector('.detail-modal-wrapper')
let updateModal = document.querySelector('.update-modal-wrapper')
let deleteModal = document.querySelector('.delete-modal-wrapper')
let productTableBody = document.querySelector('.product-table-body')
let modalElem = document.querySelectorAll('.modal')
let emptyErr = document.querySelector('.empty-err')

function showAllProducts() {
    fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(data => {
        if (data.length) {
            emptyErr.style.display = 'none'
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
                                <button class="cms-table-btn product-table-delete-btn">حذف</button>
                                <button class="cms-table-btn product-table-update-btn">ویرایش</button>
                            </td>
                        </tr>`
                )
            })
        } else {
            emptyErr.style.display = 'block'
        }
    })
}

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

function hideModal() {
    modalElem.forEach(modal => {
        modal.addEventListener('click', () => {
            modal.classList.remove('active')
        })
    })
}
hideModal()

// events
window.addEventListener('load' , showAllProducts)