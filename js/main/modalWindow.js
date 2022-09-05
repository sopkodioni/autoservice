class Modal{
    constructor(options){
        let defaulOptions = {
            isOpen: () => {},
            isClose: () => {}
        }
        this.options = Object.assign(defaulOptions, options)

        this.modals = document.querySelector('.modals')
        this.modalContainer = false

        this.speed = false
        this.animation = false
        this.isOpen = false
        this.previusActiveElement = false
        this.fixBlocks = document.querySelectorAll('.fix-block')
        this.focusElements = [
            'a[href]',
            'input',
            'button',
            'select',
            'textarea',
            '[tabindex]'
        ]
        this.events()
    }

    events(){
        if(this.modals){
            document.addEventListener('click', event => {
                const clickedElement = event.target.closest('[data-modal-path]')
                if(clickedElement){
                    let target = clickedElement.dataset.modalPath
                    let animation = clickedElement.dataset.animation
                    let speed = clickedElement.dataset.speed;
                    
                    this.animation = animation ? animation : 'fade'
                    this.speed = speed ? parseInt(speed) : 300
                    
                    this.modalContainer = document.querySelector(`[data-modal-target="${ target }"]`)
                    this.open()
                    return
                }

                const clickedClose = event.target.closest('.modals__close')
                if(clickedClose){
                    this.close()
                    return 
                }
            })

            window.addEventListener('keydown', event => {
                if(event.keyCode == 27){
                    if(this.isOpen) this.close()
                }
            })
            this.modals.addEventListener('click', event => {
                if(!event.target.classList.contains('.modals__container') && !event.target.closest('.modals__container') && this.isOpen){
                    this.close()
                }
            })
        }
    }

    open(selector){
        this.previusActiveElement = document.activeElement
        this.modals.style.setProperty('--transition-time', `${this.speed / 1000}s`)
        this.modals.classList.add('modals--open')
        this.disableScroll()
        
        this.modalContainer.classList.add('modals__container--open')
        this.modalContainer.classList.add(this.animation)

        setTimeout(() => {
            this.modalContainer.classList.add('fade--animate-open')
            this.options.isOpen(this)
            this.isOpen = true
            this.focusTrap()
        }, this.speed)
    }

    close(){
        this.enableScroll()
        this.options.isClose(this)
        if(this.modalContainer){
            this.modalContainer.classList.remove('fade--animate-open')
            this.modalContainer.classList.remove(this.animation)
            this.modals.classList.remove('modals--open')
            this.modalContainer.classList.remove('modals__container--open')

            this.isOpen = false
            this.focusTrap()
        }
    }

    focusCatch(e){

    }
    focusTrap(){
        const focusable = this.modalContainer.querySelectorAll(this.focusElements)

        if(this.isOpen){
            if(focusable) focusable[0].focus()
        } else {
            this.previusActiveElement.focus()
        }
    }

    disableScroll(){
        // let pagePosition = window.scrollY;
        // this.lockPadding()
        // document.body.classList.add('disable-scroll')
        // document.body.dataset.position = pagePosition
        // document.body.style.top = -pagePosition + 'px'
    }

    enableScroll(){
        // let pagePosition = parseInt(document.body.dataset.position, 10);
        // this.unlockPadding()
        // document.body.style.top = 'auto'
        // document.body.classList.remove('disable-scroll')
        // window.scroll({top: pagePosition, left: 0})
        // document.body.removeAttribute('data-position')
    }

    lockPadding(){
        // let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
        // this.fixBlocks.forEach(el => {
        //     el.style.paddingRight = paddingOffset
        // })
        // document.body.style.paddingRight = paddingOffset
    }

    unlockPadding(){
        // this.fixBlocks.forEach(el => {
        //     el.style.paddingRight = '0px'
        // })
        // document.body.style.paddingRight = '0px'
    }
}

const modal = new Modal({
    isOpen: (modal) => { 
        // console.log(modal)
        // console.log('Opened')
     },

     isClose: (modal) => { 
        // console.log(modal)
        
     }
})