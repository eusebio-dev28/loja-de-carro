const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")

const container = document.querySelector(".container")
const items = container.querySelectorAll(".list .item")
const indicador = document.querySelector(".indicadores")
const dots = document.querySelectorAll(".indicadores ul li")

let active = 0
let isTransitioning = false
const transitionDuration = 500

function updateIndicators() {
  const dotsOld = indicador.querySelector("ul li.active")
  if (dotsOld) dotsOld.classList.remove("active")
  dots[active].classList.add("active")
  indicador.querySelector(".number").textContent = "0" + (active + 1)
}

function resetSlideClasses(slide) {
  slide.classList.remove("fromLeft", "fromRight", "toLeft", "toRight")
}

function changeSlide(newIndex, leaveClass, enterClass) {
  if (isTransitioning) return
  isTransitioning = true

  const itemOld = container.querySelector(".list .item.active")
  const itemNew = items[newIndex]

  if (!itemOld || !itemNew || itemOld === itemNew) {
    isTransitioning = false
    return
  }

  resetSlideClasses(itemOld)
  resetSlideClasses(itemNew)

  itemOld.classList.add(leaveClass)
  itemOld.classList.remove("active")

  itemNew.classList.add(enterClass)
  itemNew.classList.add("active")

  active = newIndex
  requestAnimationFrame(() => {
    itemOld.classList.remove(leaveClass)
    itemNew.classList.remove(enterClass)
  })

  updateIndicators()

  const finishTransition = () => {
    isTransitioning = false
    itemOld.classList.remove("fromLeft", "fromRight", "toLeft", "toRight")
  }

  let finished = false
  const onTransitionEnd = () => {
    if (finished) return
    finished = true
    finishTransition()
  }

  itemOld.addEventListener("transitionend", onTransitionEnd, { once: true })
  itemNew.addEventListener("transitionend", onTransitionEnd, { once: true })
  setTimeout(onTransitionEnd, transitionDuration + 50)
}

nextButton.onclick = () => {
  const nextIndex = active + 1 >= items.length ? 0 : active + 1
  changeSlide(nextIndex, "fromLeft", "toRight")
}

prevButton.onclick = () => {
  const nextIndex = active - 1 < 0 ? items.length - 1 : active - 1
  changeSlide(nextIndex, "fromRight", "toLeft")
}
