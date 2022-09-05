const carsData = [
    {brand: "Mazda", models: ['3', '6', 'CX-5', 'CX-30', 'RX-7']},
    {brand: "Mercedes", models: ['GLC Coupe','G-Class SUV','C-Class Sedan','E-Class']},
    {brand: "Audi", models: ['Q3', 'Q4', 'Q5', 'A6']}
]

function getTemplate(items, modClass, nameInput, placeholder){
    let defaultValue = placeholder ? placeholder : 'Select'

    return `
        <div class="dropdown__button ${modClass}" data-type="btn">${defaultValue}</div>
        <ul class="dropdown__list" data-simplebar>
            ${items.join(' ')}
        </ul>
        <input class="dropdown__input" type="text" value="" name="${nameInput}">
    `
}

let selectedBrnad
let generateModels

function dropdwonBrand(dataCars, placeholder){
    let dropdownBrand = document.querySelector('.dropdown-brand')

    let items = dataCars.map(item => item.brand).map(item => `<li class="dropdown__item" data-value="${item}">${item}</li>`)
    const nameInput = 'car-brand'

    dropdownBrand.innerHTML = getTemplate(items, 'dropdown__button--brands', nameInput, placeholder)
    const dropdownBtn = dropdownBrand.querySelector('.dropdown__button')
    const dropdownList = dropdownBrand.querySelector('.dropdown__list')
    const dropdownItem = dropdownBrand.querySelector('.dropdown__item')
    const dropdownInput = dropdownBrand.querySelector('.dropdown__input')
        
    function clickHandler(event){
        const {type} = event.target.dataset
        const el = event.target
        if(type === 'btn'){
            event.preventDefault()
            dropdownBrand.classList.toggle('open')
        } 
        else if(el.classList.contains('dropdown__item')) {
            dropdownBtn.innerText = el.innerText
            dropdownInput.value = el.innerText
            selectedBrnad = el.innerText
            dropdownBtn.classList.add('selected')
            dropdownBrand.classList.remove('open')

            generateModels()
        }
    }
    
    dropdownBrand.addEventListener('click', clickHandler)
    document.documentElement.addEventListener('click', (event) => {
        if(!event.target.classList.contains('dropdown__button')){
            dropdownBrand.classList.remove('open')
        }
    })
}

function dropdwonModels(modelsCars, placeholder){
    let dropdownModels = document.querySelector('.dropdown-models')

    const dropdownBtn = dropdownModels.querySelector('.dropdown__button')
    const nameInput = 'car-models'

    generateModels = () => {
        let car = modelsCars.find(car => car.brand === selectedBrnad).models
        let items = car.map(item => `<li class="dropdown__item" data-value="${item}">${item}</li>`)
        dropdownBtn.classList.remove('disable')
        dropdownModels.innerHTML = getTemplate(items, 'dropdown__button--models', nameInput, placeholder)
    }
    
    let isOpen = false

    function clickHandler(event){
        const {type} = event.target.dataset
        const el = event.target
        if(type === 'btn'){
            event.preventDefault()
            dropdownModels.classList.toggle('open')
            isOpen = true
        } 
        else if(el.classList.contains('dropdown__item')) {
            let currentDropdown = el.closest('.dropdown')
            currentDropdown.querySelector('.dropdown__button').innerText = el.innerText
            currentDropdown.querySelector('.dropdown__input').value = el.innerText
            currentDropdown.querySelector('.dropdown__button').classList.add('selected')
            
        }
    }
    
    dropdownModels.addEventListener('click', clickHandler)
    document.documentElement.addEventListener('click', (event) => {
        if(!event.target.classList.contains('dropdown__button--models')){
            dropdownModels.classList.remove('open')
        }
    })
}


dropdwonBrand(carsData, 'You car')
dropdwonModels(carsData, 'Model')

