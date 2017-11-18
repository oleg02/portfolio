var menu = document.getElementById('menu');
var bcon = document.getElementById('b-con');
var scre = document.getElementById('screen').children;
var carouselWrap = document.getElementById('js-carousel__wrap').children;
var count;
var images = document.images;
var images_total_count = images.length;
var images_loade_count = 0;
var perc_display = document.getElementById('load');
var preloader = document.getElementById('page-preloader');

for (var i = 0; i < images_total_count; i++) {
	image_clone = new Image();
	image_clone.onload = image_loaded;
	image_clone.onerror = image_loaded;
	image_clone.src = images[i].src;
}

function isVisible(elem) {

	var coords = elem.getBoundingClientRect();

	var windowHeight = document.documentElement.clientHeight;

  // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
  var topVisible = (coords.top + 700) > 0 && (coords.top + 700) < windowHeight;
  var bottomVisible = coords.bottom - 500 < windowHeight && coords.bottom -500 > 0;

  return topVisible || bottomVisible;
}

function showVisible() {
	var sections = document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {

		var sec = sections[i];

		if (isVisible(sec)) {
			sec.classList.add('active')
		}
	}

}

window.onscroll = showVisible;
showVisible();





function image_loaded() {
	images_loade_count++;
	perc_display.innerHTML = (((100 / images_total_count) * images_loade_count) << 0) + '%';

	if (images_loade_count >= images_total_count) {
		setTimeout(function() {
			if (!preloader.classList.contains('done')) {
				preloader.classList.add('done');
				setTimeout(function(){document.body.classList.add('ready');}, 500)
				
			}
		}, 1000);
	}
}






(function(ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		if (!this) return null;
		if (this.matches(selector)) return this;
		if (!this.parentElement) { return null } else return this.parentElement.closest(selector)
	};
}(Element.prototype));

(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();



document.onclick = function(e) {

	if (e.target.closest('.menu-item')) {
		e.preventDefault()
		menu.classList.toggle('open')
		bcon.classList.toggle('open')
		document.body.classList.toggle('overf')
	}


	if (e.target.closest('#burger-open')) {
		e.preventDefault()
		menu.classList.toggle('open')
		bcon.classList.toggle('open')
		document.body.classList.toggle('overf')
	} else if (e.target.closest('#burger-close')) {
		e.preventDefault()
		menu.classList.toggle('open')
		bcon.classList.toggle('open')
		document.body.classList.toggle('overf')
	}





	if (e.target.closest('#js-carousel__next')) {
		e.preventDefault()
		if (count == undefined) {
			count = 0;
		}

		if (count == carouselWrap.length - 1) {
			carouselWrap[count].classList.remove('active');
			scre[count].classList.remove('active');
			count = 0;
			carouselWrap[0].classList.add('active');
			scre[0].classList.add('active');
			return
		}
		carouselWrap[count].classList.remove('active');
		scre[count].classList.remove('active');
		carouselWrap[count].nextElementSibling.classList.add('active');
		scre[count].nextElementSibling.classList.add('active');
		count = count + 1;
		return false
	}

	if (e.target.closest('#js-carousel__prev')) {
		e.preventDefault()
		if (count == undefined) {
			count = 0;
		}
		if (count == 0) {
			carouselWrap[0].classList.remove('active');
			scre[0].classList.remove('active');
			count = carouselWrap.length - 1
			carouselWrap[4].classList.add('active');
			scre[4].classList.add('active');
			return
		}
		carouselWrap[count].classList.remove('active');
		scre[count].classList.remove('active');
		carouselWrap[count].previousElementSibling.classList.add('active');
		scre[count].previousElementSibling.classList.add('active');
		count = count - 1;
		console.log(count)
	}
}



var linkNav = document.querySelectorAll('[href^="#home"],[href^="#contacts"],[href^="#portfolio"],[href^="#skils"],[href^="#forMe"]'),
	V = 0.5; // скорость, может иметь дробное значение через точку
	for (var i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function(e) {
			e.preventDefault();
		var w = window.pageYOffset, // прокрутка
			hash = this.href.replace(/[^#]*(.*)/, '$1'); // id элемента, к которому нужно перейти
		t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
		start = null;
		requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
		function step(time) {
			if (start === null) start = time;
			var progress = time - start,
			r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
			window.scrollTo(0, r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash // URL с хэшем
			}
		}
	}, false);
	};



(function() {
	'use strict';









	
var form = document.getElementById('form');
if (!form) return;
var	elements	= form.querySelectorAll('.form-con'),
	// объект кнопки, на который повесим обработчик события начала валидации формы
	// и отправки её значений на сервер
	btn			= document.getElementById('send_mess'),
	// паттерны RegExp о которых было написано выше
	patternName	= /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
	patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
	patternSpam	= /[^\<\>\[\]%\&'`]+$/,
	// массив с сообщениями об ошибке
	// эти сообщения можно разместить и внутри кода валидации, но лучше,
	// если они будут находиться в одном месте
	// это облегчит их редактирование, а так же проще будет прописать новые,
	// если решите добавить критерии валидации
	errorMess	= [
		'Незаполненное поле ввода', // [0]
		'Введите Ваше реальное имя', // [1]
		'Укажите Ваш электронную почту', // [2]
		'Неверный формат электронной почты', // [3]
		'Укажите тему сообщения', // [4]
		'Напишите текст сообщения', // [5]
		'Ваше сообщение похоже на спам, уберите специальные символы.' // [6]
	],
	// флаг ошибки валидации
	iserror		= false;


btn.addEventListener('click', validForm);

function validForm(e) {
	e.preventDefault();
	var formVal = getFormData(form),
		error;
 
	for (var property in formVal) {
		error = getError(formVal, property);
		if (error.length != 0) {
			// устанавливаем флаг ошибки
			iserror = true;
			// вызываем функцию отображения текста ошибки
			showError(property, error);
		}

	}
 
	// если флаг ошибки сброшен (iserror == false)
	if (!iserror) {
		// вызываем функцию отправляющую данные формы,
		// хранящиеся в объекте formVal, на сервер
		sendFormData(formVal);
	}
	return false;
}




[].forEach.call(elements, function(element) {
	// вешаем обработчик события на каждый элемент коллекции elements
	element.addEventListener('blur', function(e) {
		// получаем элемент, который покинул курсор и значение его атрибута
		var formElement = e.target,
			property = formElement.getAttribute('name'),
			// создаём объект, куда запишем данные, которые были введены
			// через это поле ввода
			dataField = {};
 
		dataField[property] = formElement.value;
 
		// получаем текст ошибки
		var error = getError(dataField, property);
		// если ошибка есть, то выводим её на экран
		if (error.length != 0) {
			showError(property, error);
		}
		return false;
	});
});

function sendFormData(formVal) {
	var xhr 	= new XMLHttpRequest(),
		// формируем тело запроса, в котором указываем имена полей и их значения
		body 	= 'username=' + encodeURIComponent(formVal.username) +
				  '&usermail=' + encodeURIComponent(formVal.usermail) +
				  '&subject=' + encodeURIComponent(formVal.subject) +
				  '&textmess=' + encodeURIComponent(formVal.textmess);
 
	// указываем метод передачи данных, адрес php-скрипта, который эти данные
	// будет обрабатывать и способ отправки данных.
	// значение 'true' соотвествует ассинхронному запросу
	xhr.open('POST', '/sendmail.php', true);
	// формируем HTTP-заголовки
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Cache-Control', 'no-cache');
 
	// отправляем тело запроса
	xhr.send(body);
 
	// XMLHttpRequest.onreadystatechange содержит обработчик события,
	// вызываемый когда происходит событие readystatechange
	xhr.onreadystatechange = function() {
		// данные на сервер отправлены удачно и получен от него положительный ответ
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			// здесь расположен код вашей callback-функции
			// например, она может выводить сообщение об успешной отправке письма
		}
	};
}







 
function getFormData(form) {
	// объект, куда будут записывать данные в формате 'имя_поля': 'значение'
	var controls = {};
	// если по какой-то причине в 'form' полей не нашлось
	// вернём в функцию validForm пустое значение
	if (!form.elements) return '';
	// переберём в цикле поля формы, получим от каждого поля его значение,
	// запишем полученные данные в 'controls'
	for (var i = 0, ln = form.elements.length; i < ln; i++) {
		var element = form.elements[i];
		// т.к. имя поля находятся в верхнем регистре (так их записывает JS
		// при создании объекта 'form'), переведём имя элемента в нижний регистр
		// и проверим, не является ли текущий элемент кнопкой, значение которой
		// нас не интересует
		if (element.name.toLowerCase() != 'button') {
			controls[element.name]= element.value;
		}
	} 
	return controls;
}

function getError(formVal, property) {
	// создаём литеральный объект validate
	// каждому свойству литерального объекта соотвествует анонимная функция, в которой
	// длина значения поля, у которого атрибут 'name' равен 'property', сравнивается с 0,
	// а само значение - с соответствующим паттерном
	// если сравнение истинно, то переменной error присваивается текст ошибки
 
	var error = '',
		validate = {
			'username': function() {
				if (formVal.username.length == 0 || patternName.test(formVal.username) == false) {
					error = errorMess[1];
				}
			},
			'usermail': function() {
				if (formVal.usermail.length == 0) {
					error = errorMess[2];
				} else if (patternMail.test(formVal.usermail) == false) {
					error = errorMess[3];
				}
			},
			'textmess': function() {
				if (formVal.textmess.length == 0) {
					error = errorMess[5];
				} else if (patternSpam.test(formVal.textmess) == false) {
					error = errorMess[6];
				}
			}
		};
 
	// если после вызова анонимной функции validate[property]() переменной error
	// было присвоено какое-то значение, то это значение и возвращаем,
	// в противном случае вернётся пустая строка, которая была присвоена изначально
	// перед объявлением лирального объекта validate
	validate[property]();
	return error;
}
 
function showError(property, error) {
	// получаем объект элемента, в который введены ошибочные данные
	var formElement = form.querySelector('[name=' + property + ']'),
	// с помощью DOM-навигации находим <span>, в который запишем текст ошибки
		errorBox	= formElement.nextElementSibling;
 
	// добавляем класс к <input>
	formElement.classList.add('form-control_error');
	// записываем текст ошибки в <span> 
	errorBox.innerHTML = error;
	// делаем <span> видимым
	errorBox.style.display = 'block';
}

 
form.addEventListener('focus', function() {
	
	// находим элемент на который была нажата мышка 
	var el = document.activeElement;
	// если этот элемент не <button type="submit">,
	// вызываем функцию очистки <span class="error"> от текста ошибки
	if (el !== btn) cleanError(el);
}, true);

function cleanError(el) {
	var errorBox = el.nextElementSibling;
	el.classList.remove('form-control_error');
	errorBox.removeAttribute('style');
}




})();