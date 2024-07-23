let bars = document.querySelector('.fa-bars-staggered')
let aside = document.querySelector('aside')
let main = document.querySelector('main')
let mainContent = document.querySelector('.main-content')
let overlay = document.querySelector('.overlay')

function showSideNav() {
    aside.style.transform = 'translateX(0px)'
    aside.style.transition = 'all 0.2s ease'
    overlay.style.display = 'block'
}


function hideSideNav() {
    aside.style.transform = 'translateX(250px)'
    aside.style.transition = 'all 0.2s ease'
    overlay.style.display = 'none'
}


// events
bars.addEventListener('click' , showSideNav)
overlay.addEventListener('click' , hideSideNav)