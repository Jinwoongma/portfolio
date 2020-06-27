'use strict';

// Make navbar transperent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark')
    } else {
        navbar.classList.remove('navbar--dark')
    }
})


// Handle scrolling when tapping on the navbar
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open')
    scrollIntoView(link)
})

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open')
})


// Handle scolling when click the contact button
const contactBtn = document.querySelector('.home__contact')
contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
})


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container')
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = (1 - window.scrollY / homeHeight)
})

// show arrow-up button when scrolling down
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible')
    } else {
        arrowUp.classList.remove('visible')
    }
})

// Handle click on the arrow up button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home')
})


// Project
const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // remove selection from the previous item and select current item
    const active = document.querySelector('.category__btn.selected')
    active.classList.remove('selected')
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected')

    projectContainer.classList.add('animate-out')
    setTimeout(() => {
        projects.forEach(project => {
            if (filter === '*' || filter == project.dataset.type) {
                project.classList.remove('invisible')
            } else {
                project.classList.add('invisible')
            }
        })
        projectContainer.classList.remove('animate-out')
    }, 300)
})

const fallingModal = document.getElementById('falling__modal');
const fallingModalBtn = document.getElementById("falling");
const fallingCloseBtn = document.getElementsByClassName("close")[0];
const hrvModal = document.getElementById('hrv__modal');
const hrvModalBtn = document.getElementById("hrv");
const hrvCloseBtn = document.getElementsByClassName("close")[1];
let slideIndex = 1;
let slideName = '';

// When the user clicks on the button, open the modal 
function fallingModalClick() {
    fallingModal.style.display = "block";
    slideIndex = 1;
    slideName = 'falling'
    showSlides(slideIndex, slideName);
}

fallingCloseBtn.onclick = function () {
    fallingModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == fallingModal) {
        fallingModal.style.display = "none";
    } else if (event.target == hrvModal) {
        hrvModal.style.display = "none"
    }
}

function hrvModalClick() {
    hrvModal.style.display = "block";
    slideIndex = 1;
    slideName = 'hrv'
    showSlides(slideIndex, slideName);
}

hrvCloseBtn.onclick = function () {
    hrvModal.style.display = "none";
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n, slideName);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n, slideName);
}

function showSlides(n, projectName) {
    let i;
    const slides = document.getElementsByClassName(`${projectName}-slide`);
    const dots = document.getElementsByClassName(`${projectName}-dot`);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector)
    scrollTo.scrollIntoView({ behavior: 'smooth' })
}

