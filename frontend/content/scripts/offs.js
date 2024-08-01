let mainUrl = `http://localhost:3000/api/`
let emptyErrBox = document.querySelector('.empty-err')
let offsTableBody = document.querySelector('.offs-table-body')

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
                            <button class="cms-table-btn">حذف</button>
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






//events
window.addEventListener('load' , showAllOffs)