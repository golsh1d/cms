let adminFullName = document.querySelector('.admin-full-name')
let adminTask = document.querySelector('.admin-task')

function showAdminInfo() {
    let adminToken = localStorage.getItem('admin-token')
    fetch('http://localhost:3000/api/admins/' , {
        headers : {
            authorization : adminToken
        }
    })
    .then(res => res.json())
    .then(data => {
        adminFullName.innerHTML = data[0].firstName + ' ' + data[0].lastName
        adminTask.innerHTML = data[0].task
    })
}

// events
window.addEventListener('load' , showAdminInfo)