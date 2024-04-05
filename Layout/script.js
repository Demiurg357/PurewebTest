function openTab(evt, tabName) {
  let tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//Фиксированная шапка
window.addEventListener('load', function () {
  let header = document.querySelector('.top_header');
  if (window.scrollY > 90) {
    header.classList.add('fixed');
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 90) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
});
//Попап формы
let popupBg = document.querySelector('.popup_bg');
let openPopupButtons = document.querySelectorAll('.popup_btn');
let closePopupButtons = document.querySelectorAll('.close_popup');
let burgerButton = document.querySelector('.burger');
openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    
    let targetId = button.getAttribute('data-target');
    let targetPopup = document.getElementById(targetId);
    if (targetPopup) {
      if (document.getElementById('popup_menu').classList.contains('active')){
        document.getElementById('popup_menu').classList.remove('active');
      }
      popupBg.classList.add('active');
      targetPopup.classList.add('active');
      if (button.classList.contains('burger')){
        burgerButton.style.backgroundImage = 'url(img/burger_close.png)';
      }
      
    }
  });
});
closePopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    popupBg.classList.remove('active');
    document.querySelectorAll('.popup').forEach(popup => {
      popup.classList.remove('active');
    });
    burgerButton.style.backgroundImage = 'url(img/burger.png)';
  });
   
});
document.addEventListener('click', (e) => {
  if (e.target === popupBg) {
    popupBg.classList.remove('active');
    document.querySelectorAll('.popup').forEach(popup => {
      popup.classList.remove('active');
    });
    burgerButton.style.backgroundImage = 'url(img/burger.png)';
  }
});

//Проверка формы
let form = document.querySelector('.b_form');
let inputs = form.querySelectorAll('input[required]');
let msg = form.querySelector('.all.error_msg');
let btn = form.querySelector('button[type="submit"]');
let fill;
let fields = document.getElementById('fields');
let success = document.getElementById('success_msg');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
if (form) {
  function checkInputs() {
    fill = 0;
    for (let input of inputs) {
      let label = document.querySelector(`label[for="${input.id}"]`);
      if (input.value.trim() === '') {
        if (label) {
          label.style.display = "block";

        }
        fill++;
      } else {
        label.style.display = "none";

      }
    }
    return fill;
  }
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (checkInputs() > 0) {
        msg.style.display = 'block';
        btn.setAttribute('disabled', 'disabled');
      } else {
        msg.style.display = 'none';
        btn.removeAttribute('disabled');

      }
    });
  });
}
form.addEventListener('submit', function(event) {

  event.preventDefault();
    fields.style.display = 'none';
    success.style.display = 'flex';
});

//маска телефона
function telMask() {
  let inputTel = document.getElementById('tel');
  inputTel.addEventListener('keydown', function (event) {
    if (!/[0-9\s]/.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  });
  let keyCode;

  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = "+7 (___)-___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      new_value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
      });
    i = new_value.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i)
    }
    let reg = matrix.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}"
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5) this.value = "";
  }
  inputTel.addEventListener("input", mask, false);
  inputTel.addEventListener("focus", mask, false);
  inputTel.addEventListener("blur", mask, false);
  inputTel.addEventListener("keydown", mask, false);
}
window.addEventListener('load', function () {
  telMask();
});

