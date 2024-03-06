import { openModal, closeModal } from './modal'
import { postData } from '../server/server'

function form(formSelector, modalTimerId) {
  //! Form
  const forms = document.querySelectorAll(formSelector)

  forms.forEach((form) => {
    bindpostData(form)
  })

  const msg = {
    loading: 'img/spinner.svg',
    sucsess: `Thank's for submitting our form!`,
    failure: 'Something went wrong',
  }

  function bindpostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMessage = document.createElement('img')
      statusMessage.src = msg.loading
      statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
                   height: 100px;
                   color: #fff;
        `
      form.insertAdjacentElement('afterend', statusMessage)

      //! FormData() [massiv] qaytaradi|
      const formData = new FormData(form) //* FormData() {object} qaytaradi yani from-ning [name]-larini obyekt qilib qaytaradi|

      // const request = new XMLHttpRequest()
      // request.open('POST', 'server.php')
      // request.setRequestHeader('Content-Type', 'multipart/form-data') //! FormData()-dan foydalanilganda setRequestHeader()-yani sarlavha yozilmaydi chunki FormData() o'zi avtomatik yozib qo'yadi|
      // request.setRequestHeader('Content-Type', 'application/json')

      //! Object.fromEntries() --[massive]-ni {object}-ga aylantirib beradi--|
      //                            {object}-ga ⬇    [massive]-ga ⬇ aylantirdi
      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      /////////////////////////////////
      //! Object.entries(obj) --{object}-ni [massive]-ga aylantirib beradi--|
      // const obj = { x: 10, y: 20 }
      // console.log(Object.entries(obj))
      ////////////////////||||||||||||||

      //! fetch('url', {option-object}) | API
      postData('http://localhost:3000/request', json)
        .then((data) => {
          showThanksModal(msg.sucsess)
          console.log(data)
          statusMessage.remove()
        })
        .catch(() => {
          showThanksModal(msg.failure)
        })
        .finally(() => {
          form.reset()
        })
    })
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')
    openModal('.modal', modalTimerId)

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
          <div class="modal__content">
              <div data-close="" class="modal__close">×</div>
              <div class="modal__title">${message}</div>
           </div>
      `

    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.add('show')
      prevModalDialog.classList.remove('hide')
      closeModal('.modal')
    }, 4000)
  }

  //! Fetch API 'GET'
  //*   'url' va {option}-object qabul qiladi|
  // fetch('https://jsonplaceholder.typicode.com/todos/1') //!fetch default yani option kiritilmagan holatda 'GET' so'ro'vini yuboradi|
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))

  //! Fetch API 'POST'
  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name: 'saydullayevDEV' }),
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))

  //! {json-server}
  //* npm i json-server
  //* create db.json file
  //* fetch(API)
  //* npx json-server --watch db.json
  // fetch('http://localhost:3000/menu')
  //   .then((data) => data.json())
  //   .then((res) => console.log(res))
}

export default form
