function Slider(sliderId) {

    let id = document.getElementById(sliderId);
	if(id) {
		this.sliderRoot = id
	}
	else {
		this.sliderRoot = document.querySelector('.slider')
	};

	// Carousel objects
	this.sliderList = this.sliderRoot.querySelector('.slider-list');
	this.sliderElements = this.sliderList.querySelectorAll('.slider-element');
	this.sliderElemFirst = this.sliderList.querySelector('.slider-element');
	this.leftArrow = this.sliderRoot.querySelector('div.slider-arrow-left');
	this.rightArrow = this.sliderRoot.querySelector('div.slider-arrow-right');
	this.indicatorDots = this.sliderRoot.querySelector('div.slider-dots');
    this.sliderLink = this.sliderList.querySelector('.pr__info-tab');

	// Initialization
	this.options = Slider.defaults;
	Slider.initialize(this)
};

Slider.defaults = {

	// Default options for the carousel
	loop: true,     // Бесконечное зацикливание слайдера
	auto: false,     // Автоматическое пролистывание
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Slider.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if (this.currentElement < 0) this.currentElement = this.elemCount-1;

	if (!this.options.loop) {
		if (this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};
	
	this.sliderElements[this.currentElement].style.opacity = '1';
	this.sliderElements[prevElement].style.opacity = '0';

	if (this.options.dots) {
		this.dotOn(prevElement);
        this.dotOff(this.currentElement)
	}
};

Slider.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if (this.currentElement >= this.elemCount) this.currentElement = 0;

	if (!this.options.loop) {
		if (this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sliderElements[this.currentElement].style.opacity = '1';
	this.sliderElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement);
        this.dotOff(this.currentElement)
	}
};

Slider.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Slider.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Slider.initialize = function(that) {

	// Constants
	that.elemCount = that.sliderElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};

	if(that.elemCount >= 1) {   // показать первый элемент
		that.sliderElemFirst.style.opacity = '1';
	};


	if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if (fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<div class="dot"></div>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sliderRoot.querySelectorAll('div.dot', 'a.pr__tab');
		// Назначаем точкам обработчик события 'click'
		for(let n = 0; n < that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function() {
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если n == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let i = 1; i < that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};

new Slider();

