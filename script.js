document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/foglalasok")
    .then(response => response.json())
    .then(data => renderFoglalasok(data))
    .catch(error => console.error("Hiba történt a foglalások lekérése során:", error));
});

function renderFoglalasok(foglalasok) {
  const tableBody = document.querySelector("#foglalasokTable");
  tableBody.innerHTML = "";

  foglalasok.sort((a, b) => new Date(b.datum) - new Date(a.datum));

  foglalasok.forEach(foglalas => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDate(foglalas.datum)}</td>
      <td>${foglalas.nev}</td>
      <td>${foglalas.fo}</td>
      <td>${foglalas.cim}</td>
      <td>${foglalas.iranyitoszam}</td>
    `;
    tableBody.appendChild(row);
  });
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('hu-HU', options);
}

document.addEventListener("DOMContentLoaded", function() {
  const newBookingForm = document.querySelector("#newBookingForm");

  newBookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(newBookingForm);
    const newRecord = {};
    formData.forEach((value, key) => {
      newRecord[key] = value;
    });

    fetch("http://localhost:3000/foglalasok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecord)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("A hálózati válasz nem volt megfelelő.");
      }
      window.location.href = "ujFoglalas.html";
    })
    .catch(error => {
      console.error("Hiba történt az új rekord hozzáadásakor:", error);
    });
  });
});