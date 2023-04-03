class Slider {
    constructor(config) {
        this.slider = document.querySelector(config.slider)
        this.timeMove = config.time
        this.item = [...this.slider.children]
        this.next = document.querySelector('.slider__controls-next')
        this.prev = document.querySelector('.slider__controls-prev')
        // console.log(this.item);
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.direction = config.direction != undefined ? config.direction : 'X';
        this.moveSize = this.width
        this.active = true
        this.activeSlide = 0

        this.slider.style = `
                                position: relative;
                                overflow: hidden;
                                max-width: ${this.width}px;
                                width:100%;
                               `
        for (let i = 0; i < this.item.length; i++) {
            const item = this.item[i];
            item.style = `position: absolute;
                width: 100%;
                height: ${this.height}px;
               `
            if (i != this.activeSlide) {
                item.style.transform = `translate${this.direction}(${this.moveSize}px)`
            }
            if (i == this.item.length - 1) {
                item.style.transform = `translate${this.direction}(${-this.moveSize}px)`
            }
        }
        this.next.addEventListener('click', () => this.clickBtn(this.next))
        this.prev.addEventListener('click', () => this.clickBtn(this.prev))
    }
    clickBtn(btn) {

        this.prev.disabled = true
        this.next.disabled = true
    
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.timeMove);
        
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize
        for (let i = 0; i < this.item.length; i++) {
            const sliders = this.item[i]
            sliders.style.transition = '0ms'
            if (i != this.activeSlide) {
                sliders.style.transform = `translate${this.direction}(${btnLeftOrRight * -1}px)`
            }
        }
        
        this.item[this.activeSlide].style.transform = `translate${this.direction}(${btnLeftOrRight}px)`
        this.item[this.activeSlide].style.transition = `${this.timeMove}ms`;

        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.item.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.item.length - 1
            }
        }
        this.item[this.activeSlide].style.transform = `translate${this.direction}(0px)`
        this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
    }
}
const slider = new Slider({
    direction: 'X',
    slider: '#carousel',
    time: 1000,
})

// header slider start

let headerSliderBig = document.querySelector(".header__slider-big img")
let headerSliderImg = document.querySelectorAll(".header__slider-img img")

for (let i = 0; i < headerSliderImg.length; i++) {
    headerSliderImg[i].addEventListener("click", function () {
        let headerSliderImgSrc = headerSliderImg[i].getAttribute("src")
        // console.log(headerSliderImgSrc);
        headerSliderBig.setAttribute("src", headerSliderImgSrc)
    })
}

// header slider end


// tab start

document.querySelectorAll('.trending__link').forEach((item) =>
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const id = e.target.getAttribute('href').replace('#' , '');
        document.querySelectorAll('.trending__link').forEach((child) => 
        child.classList.remove('trending__link--active')
        );
        document.querySelectorAll('.trending__cards').forEach((child) => 
        child.classList.remove('trending__cards--active')
        );
        item.classList.add('trending__link--active');
        document.getElementById(id).classList.add('trending__cards--active');
    } )
);
document.querySelector('.trending__link').click();



// tab end 