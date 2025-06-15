const form = document.getElementById("guest-form");
const input = document.getElementById("guest-ame");
const list = document.getElementById("guest-list");

let guests = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = input.ariaValueMax.trim();
  if (!name) return;

  if (guests.length >= 10) {
    alert("Guest limit reached (10). Cannot add more guests.");
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    attending: true,
  };

  guests.push(guest);
  input.value = "";
  renderGuests();
});

function renderGuests() {
  list.innerHTML = "";

  guests.forEach((guest) => {
    const li = document.createElement("li");
    li.className = guest.attending ? "attending" : "not.attending";

    li.innerHTML = ` 
    ${guest.name}
    <span>
      <button onclick="toggleRSVP(${guest.id})">${guest.attending ? "Attending" : "Not Attending"}</button>
      <button onclick="removeGuest(${guest.id})">Remove</button>
    </span>
    `;

    list.appendChild(li);
  });
}

window.removeGuest = function(id) {
  guests = guests.map((guest) => guest.id !== id);
  renderGuests();
};

window.toggleRSVP = function (id) {
  guests = guests.map((guest) => guest.id === id ? {...guest, attending: !guest.attending} : guest);
  renderGuests();
};
