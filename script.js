const currentYearDisplay = document.querySelector(".year-display")
const currentMonthYearDisplay = document.querySelector(".month-year-display")
const currentDecadeDisplay = document.querySelector(".decade-display")
const calendarDaysGrid = document.querySelector(".calendar-days")
const monthsGrid = document.querySelector(".months-grid")
const yearsGrid = document.querySelector(".years-grid")

const navUpBtns = document.querySelectorAll(".nav-up")
const navDownBtns = document.querySelectorAll(".nav-down")
const monthView = document.querySelector(".calendar-month-view")
const yearView = document.querySelector(".calendar-year-view")
const decadeView = document.querySelector(".calendar-decade-view")
const viewModeToggle = document.querySelector(".current-date-toggle")
const currentDateHeader = document.querySelector(".current-date")

let currentDate = new Date()
let currentView = "month"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function renderCalendar() {
  updateHeaderDate()
  if (currentView === "month") {
    renderMonthView()
    showView(monthView)
  } else if (currentView === "year") {
    renderYearView()
    showView(yearView)
  } else if (currentView === "decade") {
    renderDecadeView()
    showView(decadeView)
  }
}

function showView(viewElement) {
    ;[monthView, yearView, decadeView].forEach((view) => {
        view.classList.remove("active-view")
        view.classList.add("hidden-view")
    })
    viewElement.classList.remove("hidden-view")
    viewElement.classList.add("active-view")
}

function updateHeaderDate() {
    const today = new Date()
    const dayName = weekdays[today.getDay()]
    const day = today.getDate()
    const monthName = months[today.getMonth()]
    currentDateHeader.textContent = `${dayName}, ${monthName} ${day}`
}

function renderMonthView() {
    calendarDaysGrid.innerHTML = ""
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    currentMonthYearDisplay.textContent = `${months[month]}, ${year}`

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const lastDayPrevMonth = new Date(year, month, 0)
    const numDaysInMonth = lastDayOfMonth.getDate()
    const firstWeekday = firstDayOfMonth.getDay()

    const today = new Date()
    const isCurrentMonth = (month === today.getMonth() && year === today.getFullYear())
    const currentSelectedDay = currentDate.getDate() 

    for (let i = firstWeekday; i > 0; i--) {
        const day = lastDayPrevMonth.getDate() - i + 1
        const daySpan = document.createElement("span")
        daySpan.textContent = day
        daySpan.classList.add("other-month")
        calendarDaysGrid.appendChild(daySpan)
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
        const daySpan = document.createElement("span")
        daySpan.textContent = i
        daySpan.classList.add("day")

        if (i === today.getDate() && isCurrentMonth) {
            daySpan.classList.add("today")
        }

        if (i === currentSelectedDay && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            daySpan.classList.add("selected")
        }

        daySpan.addEventListener("click", () => {
            document.querySelectorAll(".calendar-days .selected").forEach((el) => {
                el.classList.remove("selected")
            })
            daySpan.classList.add("selected")

            currentDate.setFullYear(year, month, i)
            updateHeaderDate()
        })

        calendarDaysGrid.appendChild(daySpan)
    }

    const totalDaysDisplayed = firstWeekday + numDaysInMonth
    const remainingCells = 42 - totalDaysDisplayed

    for (let i = 1; i <= remainingCells; i++) {
        const daySpan = document.createElement("span")
        daySpan.textContent = i
        daySpan.classList.add("other-month")
        calendarDaysGrid.appendChild(daySpan)
    }
}

function renderYearView() {
    monthsGrid.innerHTML = "";
    const year = currentDate.getFullYear();
    currentYearDisplay.textContent = year;

    const today = new Date();

    shortMonths.forEach((monthName, index) => {
        const monthItem = document.createElement("span");
        monthItem.textContent = monthName;
        monthItem.classList.add("month-item");

        if (index === today.getMonth() && year === today.getFullYear()) {
            monthItem.classList.add("selected");
        }

        monthItem.addEventListener("click", () => {
            currentDate.setMonth(index); 
            currentView = "month";
            renderCalendar();
        });

        monthsGrid.appendChild(monthItem);
    });

    for (let i = 0; i < 4; i++) { 
        const monthItem = document.createElement("span");
        monthItem.textContent = shortMonths[i];
        monthItem.classList.add("month-item", "other-year-month"); 
        
        monthItem.addEventListener("click", () => {
            currentDate.setFullYear(year + 1); 
            currentDate.setMonth(i); 
            currentView = "month";
            renderCalendar();
        });

        monthsGrid.appendChild(monthItem);
    }
}

function renderDecadeView() {
  yearsGrid.innerHTML = ""
  const year = currentDate.getFullYear()
  const startDecade = Math.floor(year / 10) * 10
  const endDecade = startDecade + 9

  currentDecadeDisplay.textContent = `${startDecade} - ${endDecade}`

  const today = new Date()

  for (let i = startDecade - 1; i <= endDecade + 1; i++) {
        const yearItem = document.createElement("span");
        yearItem.textContent = i;
        yearItem.classList.add("year-item");

        if (i < startDecade || i > endDecade) {
            yearItem.classList.add("other-decade"); 
        }

        if (i === today.getFullYear()) {
            yearItem.classList.add("selected");
        }

        yearItem.addEventListener("click", () => {
            currentDate.setFullYear(i);
            currentView = "year";
            renderCalendar();
        });

        yearsGrid.appendChild(yearItem);
    }

    for (let i = 1; i <= 4; i++) { 
        const nextYear = endDecade + 1 + i;
        const yearItem = document.createElement("span");
        yearItem.textContent = nextYear;
        yearItem.classList.add("year-item", "other-decade"); 

        yearItem.addEventListener("click", () => {
            currentDate.setFullYear(nextYear);
            currentView = "year";
            renderCalendar();
        });
        yearsGrid.appendChild(yearItem);
    }
}

navUpBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentView === "month") {
      currentDate.setMonth(currentDate.getMonth() - 1)
    } else if (currentView === "year") {
      currentDate.setFullYear(currentDate.getFullYear() - 1)
    } else if (currentView === "decade") {
      currentDate.setFullYear(currentDate.getFullYear() - 10)
    }
    renderCalendar()
  })
})

navDownBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentView === "month") {
      currentDate.setMonth(currentDate.getMonth() + 1)
    } else if (currentView === "year") {
      currentDate.setFullYear(currentDate.getFullYear() + 1)
    } else if (currentView === "decade") {
      currentDate.setFullYear(currentDate.getFullYear() + 10)
    }
    renderCalendar()
  })
})

currentMonthYearDisplay.addEventListener("click", () => {
  if (currentView === "month") {
    currentView = "year"
    renderCalendar()
  }
})

currentYearDisplay.addEventListener("click", () => {
  if (currentView === "year") {
    currentView = "decade"
    renderCalendar()
  }
})

currentDecadeDisplay.addEventListener("click", () => {
  if (currentView === "decade") {
    currentView = "year"
    renderCalendar()
  }
})

currentDateHeader.addEventListener("click", () => {
    currentDate = new Date(); 
    currentView = "month";
    renderCalendar();
});

let timer = null
let totalSeconds = 30 * 60

const timeDisplay = document.getElementById("time-display")
const focusBtn = document.querySelector(".focus-btn")
const endBtn = document.querySelector(".end-btn")

function updateTimeDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (timer) {
        timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
        if (totalSeconds < 60) {
            timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        } else {
            timeDisplay.textContent = `${minutes} mins`;
        }
    }
}

function toggleButtons(isFocusing) {
  if (isFocusing) {
    focusBtn.style.display = "none"
    endBtn.style.display = "inline-block"
  } else {
    focusBtn.style.display = "inline-block"
    endBtn.style.display = "none"
  }
}

function startFocusSession() {
  if (timer) return

  toggleButtons(true)
  timer = setInterval(() => {
    totalSeconds--
    updateTimeDisplay()

    if (totalSeconds <= 0) {
      clearInterval(timer)
      timer = null
      toggleButtons(false)
      alert("Hết giờ Focus!")
      totalSeconds = 30 * 60
      updateTimeDisplay()
    }
  }, 1000)
}

function endFocusSession() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  totalSeconds = 30 * 60
  updateTimeDisplay()
  toggleButtons(false)
}

focusBtn.addEventListener("click", startFocusSession)
endBtn.addEventListener("click", endFocusSession)

document.querySelectorAll(".time-adjust-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (timer) return

    if (button.textContent === "+") {
      totalSeconds += 60
    } else if (button.textContent === "-") {
      totalSeconds = Math.max(60, totalSeconds - 60)
    }
    updateTimeDisplay()
  })
})

function handleWheelScroll(event) {
  event.preventDefault() 

  const delta = event.deltaY > 0 ? 1 : -1 

  if (currentView === "month") {
    currentDate.setMonth(currentDate.getMonth() + delta)
  } else if (currentView === "year") {
    currentDate.setFullYear(currentDate.getFullYear() + delta)
  } else if (currentView === "decade") {
    currentDate.setFullYear(currentDate.getFullYear() + delta * 10)
  }

  renderCalendar()
}
;[monthView, yearView, decadeView].forEach((view) => {
  view.addEventListener("wheel", handleWheelScroll, { passive: false })
})

let touchStartX = 0
let touchStartY = 0
let touchEndX = 0
let touchEndY = 0

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX
  touchStartY = event.changedTouches[0].screenY
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX
  touchEndY = event.changedTouches[0].screenY
  handleSwipe()
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX
  const deltaY = touchEndY - touchStartY
  const minSwipeDistance = 50

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
    const direction = deltaX > 0 ? -1 : 1 

    if (currentView === "month") {
      currentDate.setMonth(currentDate.getMonth() + direction)
    } else if (currentView === "year") {
      currentDate.setFullYear(currentDate.getFullYear() + direction)
    } else if (currentView === "decade") {
      currentDate.setFullYear(currentDate.getFullYear() + direction * 10)
    }

    renderCalendar()
  }

  if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
    const direction = deltaY > 0 ? 1 : -1 

    if (direction > 0) {
      if (currentView === "decade") {
        currentView = "year"
      } else if (currentView === "year") {
        currentView = "month"
      }
    } else {
      if (currentView === "month") {
        currentView = "year"
      } else if (currentView === "year") {
        currentView = "decade"
      }
    }

    renderCalendar()
  }
}

const calendarContainer = document.querySelector(".calendar-container")
calendarContainer.addEventListener("touchstart", handleTouchStart, { passive: true })
calendarContainer.addEventListener("touchend", handleTouchEnd, { passive: true })

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault()
      if (currentView === "month") {
        currentDate.setMonth(currentDate.getMonth() - 1)
      } else if (currentView === "year") {
        currentDate.setFullYear(currentDate.getFullYear() - 1)
      } else if (currentView === "decade") {
        currentDate.setFullYear(currentDate.getFullYear() - 10)
      }
      renderCalendar()
      break

    case "ArrowRight":
      event.preventDefault()
      if (currentView === "month") {
        currentDate.setMonth(currentDate.getMonth() + 1)
      } else if (currentView === "year") {
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      } else if (currentView === "decade") {
        currentDate.setFullYear(currentDate.getFullYear() + 10)
      }
      renderCalendar()
      break

    case "ArrowUp":
      event.preventDefault()
      if (currentView === "month") {
        currentView = "year"
      } else if (currentView === "year") {
        currentView = "decade"
      }
      renderCalendar()
      break

    case "ArrowDown":
      event.preventDefault()
      if (currentView === "decade") {
        currentView = "year"
      } else if (currentView === "year") {
        currentView = "month"
      }
      renderCalendar()
      break

    case "Home":
      event.preventDefault()
      currentDate.setTime(new Date().getTime()) 
      currentView = "month"
      renderCalendar()
      break

    case "Escape":
      event.preventDefault()
      currentView = "month"
      renderCalendar()
      break
  }
}

document.addEventListener("keydown", handleKeyPress)

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar()
  updateTimeDisplay()
  toggleButtons(false)
})