let bars = document.querySelector('.fa-bars-staggered')
let aside = document.querySelector('aside')
let main = document.querySelector('main')
let mainContent = document.querySelector('.main-content')

function showSideNav() {
    aside.style.transform = 'translateX(0px)'
    aside.style.transition = 'all 0.2s ease'
}


function hideSideNav() {
    aside.style.transform = 'translateX(250px)'
    aside.style.transition = 'all 0.2s ease'
}


// events
bars.addEventListener('click' , showSideNav)
mainContent.addEventListener('click' , hideSideNav)