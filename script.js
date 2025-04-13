let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(nextSlide, 3000);



const apiUrl = 'https://api.telegram.org/bot7588635784:AAHLuozg0_A7vflRInaZ1jGrQ9Ag59U-zbc/sendMessage';

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('name');
    const telInput = document.getElementById('tel');
    const submitButton = document.getElementById('submit');
    telInput.value = "+998";


    telInput.addEventListener('input', function () {
        // Faqat + va raqamlarga ruxsat beriladi
        this.value = this.value.replace(/[^\d+]/g, '');
    
        // + belgisi faqat boshida bo'lishiga ruxsat
        if (this.value.indexOf('+') > 0) {
          this.value = this.value.replace(/\+/g, '');
          this.value = '+' + this.value;
        }
      });
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Foydalanuvchi ma'lumotlarini tekshirish
        if (!nameInput.value.trim() || !telInput.value.trim()) {
            alert("Iltimos, barcha maydonlarni to'ldiring! * Пожалуйста, заполните все поля!");
            return;
        }

        // Xabarni tayyorlash
        const params = {
            chat_id: '5868387236', // Sizning chat ID
            text: `📌 *Yangi ariza kelib tushdi!* \n\n👤 Ism:  *${nameInput.value}* \n📞 Telefon:  *${telInput.value}*`,
            parse_mode: 'Markdown'
        };

        // Telegram API orqali xabar yuborish
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Xabar muvaffaqiyatli yuborildi! Tez orada siz bilan bog‘lanamiz 😊 * Сообщение успешно отправлено! Мы скоро с вами свяжемся 😊');
                nameInput.value = '';
                telInput.value = "+998";
            } else {
                alert(`Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring! * Произошла ошибка. Пожалуйста, попробуйте еще раз!`);
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
            alert("Xabar yuborishda xatolik yuz berdi!");
        });
    });
});

const uzLangButton = document.querySelector('.lang button:first-child');
const ruLangButton = document.querySelector('.lang button:last-child');
const elementsToTranslate = {
    title: document.querySelector('h2'),
    description: document.querySelector('p'),
    namePlaceholder: document.getElementById('name'),
    phonePlaceholder: document.getElementById('tel'),
    submitButton: document.getElementById('submit'),
    note: document.querySelector('.note')
};

const translations = {
    uz: {
        title: "<span>Siz ham</span> shunday natijalarga erishmoqchimisiz?",
        description: "U holda telefon raqamingizni qoldiring va biz sizga batafsil ma'lumot beramiz.",
        namePlaceholder: "Ismingiz",
        phonePlaceholder: "+998 (__) __-__-__",
        submitButton: "Yuborish",
        note: "* 15 yillik tajribaga ega ustozlardan taxsil oling!.",
        successAlert: "Xabar muvaffaqiyatli yuborildi! Tez orada aynan siz bilan bog‘lanamiz😊",
        errorAlert: "Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!",
        emptyFieldsAlert: "Iltimos, barcha maydonlarni to‘ldiring!"
    },
    ru: {
        title: "<span>Вы тоже</span> хотите достичь таких результатов?",
        description: "Тогда оставьте ваш номер телефона, и мы предоставим вам более подробную информацию.",
        namePlaceholder: "Ваше имя",
        phonePlaceholder: "+998 (__) __-__-__",
        submitButton: "Отправить",
        note: "* Учитесь у преподавателей с 15-летним стажем!",
        successAlert: "Сообщение успешно отправлено! Мы скоро с вами свяжемся 😊",
        errorAlert: "Произошла ошибка. Пожалуйста, попробуйте еще раз!",
        emptyFieldsAlert: "Пожалуйста, заполните все поля!"
    }
};

let currentLang = 'uz';

uzLangButton.addEventListener('click', () => changeLanguage('uz'));
ruLangButton.addEventListener('click', () => changeLanguage('ru'));

function changeLanguage(lang) {
    currentLang = lang;
    elementsToTranslate.title.innerHTML = translations[lang].title;
    elementsToTranslate.description.textContent = translations[lang].description;
    elementsToTranslate.namePlaceholder.placeholder = translations[lang].namePlaceholder;
    elementsToTranslate.phonePlaceholder.placeholder = translations[lang].phonePlaceholder;
    elementsToTranslate.submitButton.textContent = translations[lang].submitButton;
    elementsToTranslate.note.textContent = translations[lang].note;
}






