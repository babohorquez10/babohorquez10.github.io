const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function toSlide(num, id) {
  $('.app-nav-link').removeClass('active');
  $(`#${id}`).addClass('active');
  $('.carousel').carousel(num);
}

async function sendEmail(name, phone, email, message) {
  const prom = await fetch('/api/sendemail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      phone,
      email,
      message
    }),
  });

  const json = await prom.json();

  console.log(json.message);
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  e.stopPropagation();

  const name = document.getElementById('contactFormName');
  const phone = document.getElementById('contactFormPhone');
  const email = document.getElementById('contactFormEmail');
  const message = document.getElementById('contactFormMessage');

  sendEmail(name.value, phone.value, email.value, message.value);

  form.hidden = true;
  formMessage.hidden = false;

  name.value = '';
  phone.value = '';
  email.value = '';
  message.value = '';
  
});


function showForm() {

  formMessage.hidden = true;
  form.hidden = false;
}

