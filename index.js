const form = document.getElementById("registrationForm")
const tableBody = document.querySelector("#entriesTable tbody")

function calculateAge(dob) {
  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || []
  tableBody.innerHTML = ""
  entries.forEach(entry => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `
    tableBody.appendChild(row)
  })
}

form.addEventListener("submit", function(e) {
  e.preventDefault()
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const dob = document.getElementById("dob").value
  const acceptedTerms = document.getElementById("acceptTerms").checked
  const age = calculateAge(dob)

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55")
    return
  }

  const newEntry = { name, email, password, dob, acceptedTerms }
  const entries = JSON.parse(localStorage.getItem("entries")) || []
  entries.push(newEntry)
  localStorage.setItem("entries", JSON.stringify(entries))
  loadEntries()
  form.reset()
})

window.onload = loadEntries
