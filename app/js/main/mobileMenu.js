const menuBtn = document.querySelector('.nav-btn')
const mobileMenu = document.querySelector('.mobile-menu')

const openMobileMenu = () => {
    mobileMenu.classList.add('mobile-menu--open')
    document.documentElement.style.overflowY = 'hidden'
}

const closeMobileMenu = (event) => {
    if(event.target.classList.contains('mobile-menu__close')) {
        mobileMenu.classList.remove('mobile-menu--open')
        document.documentElement.style.overflowY = 'scroll'
    }
}

menuBtn.addEventListener('click', openMobileMenu)
mobileMenu.addEventListener('click', closeMobileMenu)
