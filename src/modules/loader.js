function loader() {
  loader = document.querySelector('.loader')

  //! Loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }, 1000)
}

export default loader
