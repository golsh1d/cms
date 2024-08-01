let mainUrl = 'http://localhost:3000/api/'
let usersTableBody = document.querySelector('.users-table-body')
let emptyErrBox = document.querySelector('.empty-err')

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
                            <button class="cms-table-btn">حذف</button>
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









// events
window.addEventListener('load' , showAllUsers)