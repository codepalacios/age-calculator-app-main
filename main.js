/* Vars */
// Select the necessary DOM elements.
const ageCalculationForm = document.querySelector("#ageCalculationForm");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const yearsAge = document.querySelector("#yearsAge");
const monthsAge = document.querySelector("#monthsAge");
const daysAge = document.querySelector("#daysAge");
const dayLabel = document.querySelector(".form__label--day");
const monthLabel = document.querySelector(".form__label--month");
const yearLabel = document.querySelector(".form__label--year");
const dayErrorMessage = dayInput.nextElementSibling;
const monthErrorMessage = monthInput.nextElementSibling;
const yearErrorMessage = yearInput.nextElementSibling;
const dateErrorMessage = document.querySelector(".form__error-message--date");
// Variables for animation intervals.
let yearsIntervalId;
let monthsIntervalId;
let daysIntervalId;
// Variable to check if the date is invalid.
let isInvalidDate;

/* Functions */
// Animate age counting.
function animateAgeCount(element, target) {
  let counter = 0;
  let intervalId = setInterval(() => {
    if (counter <= target) {
      element.textContent = counter;
      counter++;
    } else {
      clearInterval(intervalId);
    }
  }, 50);
  return intervalId;
}

// Removes the invalid class from the input fields and error messages.
function removeInvalidClassFromFields() {
  dayLabel.classList.remove("invalid");
  dayInput.classList.remove("invalid");
  dayErrorMessage.classList.remove("invalid");
  dayErrorMessage.textContent = "";
  monthLabel.classList.remove("invalid");
  monthInput.classList.remove("invalid");
  monthErrorMessage.classList.remove("invalid");
  monthErrorMessage.textContent = "";
  yearLabel.classList.remove("invalid");
  yearInput.classList.remove("invalid");
  yearErrorMessage.classList.remove("invalid");
  yearErrorMessage.textContent = "";
  dateErrorMessage.classList.remove("invalid");
  dateErrorMessage.textContent = "";
}

// Marks the input fields and error messages as invalid.
function markAsInvalid(label, input, errorMessage) {
  label.classList.add("invalid");
  input.classList.add("invalid");
  errorMessage.classList.add("invalid");
  isInvalidDate = false;
}

// Marks the date input fields and error messages as invalid.
function markDateAsInvalid() {
  dateErrorMessage.textContent = "Must be a valid date";
  dayLabel.classList.add("invalid");
  dayInput.classList.add("invalid");
  monthLabel.classList.add("invalid");
  monthInput.classList.add("invalid");
  yearLabel.classList.add("invalid");
  yearInput.classList.add("invalid");
  dateErrorMessage.classList.add("invalid");
}

/* Events */
// Limits the length of input fields to 2 for day and month, and 4 for year.
dayInput.addEventListener("input", function (e) {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }
});
monthInput.addEventListener("input", function (e) {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }
});
yearInput.addEventListener("input", function (e) {
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4);
  }
});

// Handles the age calculator form submit event.
ageCalculationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Gets the entered date of birth and the current date.
  const day = Number(document.querySelector("#day").value);
  const month = Number(document.querySelector("#month").value) - 1;
  const year = Number(document.querySelector("#year").value);
  const dateOfBirth = new Date(year, month, day);
  const todayDate = new Date();

  // Validates if the date of birth is valid and if the date is not future.
  if (
    dateOfBirth.getFullYear() === year &&
    dateOfBirth.getMonth() === month &&
    dateOfBirth.getDate() === day &&
    dateOfBirth.getTime() <= todayDate.getTime()
  ) {
    // Age calculation.
    // Calculation of years.
    let age = todayDate.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = todayDate.getMonth() - dateOfBirth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && todayDate.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    // Calculation of months.
    let monthsSinceLastBirthday = todayDate.getMonth() - dateOfBirth.getMonth();
    if (
      monthsSinceLastBirthday < 0 ||
      (monthsSinceLastBirthday === 0 &&
        todayDate.getDate() < dateOfBirth.getDate())
    ) {
      monthsSinceLastBirthday += 12;
    }
    // Calculation of days.
    let daysSinceLastBirthday;
    if (todayDate.getMonth() === dateOfBirth.getMonth()) {
      if (todayDate.getDate() < dateOfBirth.getDate()) {
        daysSinceLastBirthday = todayDate.getDate();
      } else if (todayDate.getDate() === dateOfBirth.getDate()) {
        daysSinceLastBirthday = 0;
      } else {
        daysSinceLastBirthday = todayDate.getDate() - dateOfBirth.getDate();
      }
    } else {
      daysSinceLastBirthday = todayDate.getDate();
    }

    // Delete messages from invalid previous dates.
    removeInvalidClassFromFields();

    // Show the results.
    // Delete previous intervals.
    if (yearsIntervalId) {
      clearInterval(yearsIntervalId);
    }
    if (monthsIntervalId) {
      clearInterval(monthsIntervalId);
    }
    if (daysIntervalId) {
      clearInterval(daysIntervalId);
    }
    // Display the results in the DOM.
    yearsIntervalId = animateAgeCount(yearsAge, age);
    monthsIntervalId = animateAgeCount(monthsAge, monthsSinceLastBirthday);
    daysIntervalId = animateAgeCount(daysAge, daysSinceLastBirthday);
  } else {
    // Delete messages from invalid previous dates.
    removeInvalidClassFromFields();

    // Set the date flag to true.
    isInvalidDate = true;

    // Validates the date of birth and displays error messages.
    // Validates the day.
    if (dayInput.value.trim() === "") {
      dayErrorMessage.textContent = "This field is required";
    } else if (day < 1 || day > 31) {
      dayErrorMessage.textContent = "Must be a valid day";
    }
    if (dayErrorMessage.textContent !== "") {
      markAsInvalid(dayLabel, dayInput, dayErrorMessage);
    }
    // Validates the month.
    if (monthInput.value.trim() === "") {
      monthErrorMessage.textContent = "This field is required";
    } else if (month < 0 || month > 11) {
      monthErrorMessage.textContent = "Must be a valid month";
    }
    if (monthErrorMessage.textContent !== "") {
      markAsInvalid(monthLabel, monthInput, monthErrorMessage);
    }
    // Validates the year.
    if (yearInput.value.trim() === "") {
      yearErrorMessage.textContent = "This field is required";
    } else if (year > todayDate.getFullYear()) {
      yearErrorMessage.textContent = "Must be in the past";
    } else if (year < 100) {
      yearErrorMessage.textContent = "Must be a valid year";
    }
    if (yearErrorMessage.textContent !== "") {
      markAsInvalid(yearLabel, yearInput, yearErrorMessage);
    }
    // Shows an error message if the date of birth is not valid.
    if (isInvalidDate) {
      markDateAsInvalid();
    }
  }
});
