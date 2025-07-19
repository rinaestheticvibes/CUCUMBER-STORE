      // SideBar Overlay Function
function toggleSidebar() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'flex';
  document.querySelector('.menu').classList.add('open');
}

function closeSidebar() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  document.querySelector('.menu').classList.remove('open');
}

// Click outside to close, but not inside sidebar
document.addEventListener('click', function (event) {
  const overlay = document.getElementById('overlay');
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.menu');

  const clickedInsideSidebar = sidebar.contains(event.target);
  const clickedHamburgerButton = menu.contains(event.target);

  if (overlay.style.display === 'flex' && !clickedInsideSidebar && !clickedHamburgerButton) {
    closeSidebar();
  }
});

// Prevent sidebar click from closing it (stops event bubbling)
document.getElementById('sidebar').addEventListener('click', function (event) {
  event.stopPropagation();
});


//Diamond Selecting Function
    let selectedDiamond = null;
    let selectedPayment = null;

    function updateSummary() {
      document.getElementById("summaryId").textContent = "ID: " + (document.getElementById("playerId").value || "-");
      document.getElementById("summaryServer").textContent = "Server: " + (document.getElementById("serverId").value || "-");
      document.getElementById("summaryDiamonds").textContent = "Diamonds: " + (selectedDiamond?.diamonds || "-");
      document.getElementById("summaryPayment").textContent = "Payment: " + (selectedPayment?.method || "-");
      document.getElementById("summaryPrice").textContent = "Total: ₹" + (selectedDiamond?.price || "-");
    }

    document.getElementById("playerId").addEventListener("input", updateSummary);
    document.getElementById("serverId").addEventListener("input", updateSummary);

    document.querySelectorAll(".diamond-option").forEach(option => {
      option.addEventListener("click", () => {
        document.querySelectorAll(".diamond-option").forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
        selectedDiamond = {
          diamonds: option.getAttribute("data-diamonds"),
          price: option.getAttribute("data-price")
        };
        updateSummary();
      });
    });
 document.querySelectorAll(".payment-option").forEach(option => {
      option.addEventListener("click", () => {
        document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
        selectedPayment = {
          method: option.getAttribute("data-method")
        };
        updateSummary();
      });
    });

    function placeOrder() {
  const id = document.getElementById("playerId").value;
  const server = document.getElementById("serverId").value;

  if (!id || !server || !selectedDiamond || !selectedPayment) {
    alert("❌ Please fill all fields and select diamond & payment method.");
    return;
  }


  const message = `*MLBB DIAMOND ORDER FROM CUCUMBER STORE:* \n
*ID:* ${id}
*Server:* ${server}
*Diamonds:* ${selectedDiamond.diamonds}
*Payment Method:* ${selectedPayment.method}
*Total:* ₹${selectedDiamond.price} \n
*_Sir, Please confirm my ordered!_ (◕‿◕)*`;

  const encodedMessage = encodeURIComponent(message);
  const phone = "918787550589";
  const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  // Open WhatsApp with the pre-filled message
  window.open(waUrl, "_blank");
}

// Qr Code Button Function
function showQRCode() {
  const qrBox = document.getElementById("qrCodeBox");
  qrBox.style.display = qrBox.style.display === "none" ? "block" : "none";
}


function toggleSidebar() {
  document.getElementById('overlay').style.display = 'flex';
}
function closeSidebar() {
  document.getElementById('overlay').style.display = 'none';
}
function openAdminPanel() {
  document.getElementById('adminPanelOverlay').style.display = 'flex';
}
function closeAdminPanel(event) {
  if (event.target.id === 'adminPanelOverlay') {
    document.getElementById('adminPanelOverlay').style.display = 'none';
    document.getElementById('priceControl').style.display = 'none';
    document.getElementById('adminPass').value = '';
  }
}
function checkDev() {
  const pass = document.getElementById('adminPass').value;
  if (pass === '1234') {
    document.getElementById('priceControl').style.display = 'block';
  } else {
    alert('Wrong password!');
  }
}
function addNewPack() {
  const diamonds = document.getElementById('newDiamonds').value;
  const price = document.getElementById('newPrice').value;
  const outOfStock = document.getElementById('newOutOfStock').checked;

  if (!diamonds || !price) return alert("Please fill both fields");

  const pack = document.createElement("div");
  pack.className = "diamond-option";
  pack.setAttribute("data-diamonds", diamonds);
  pack.setAttribute("data-price", price);

  const label = outOfStock ? "💎" : "🆕 💎";
  pack.textContent = `${label} ${diamonds} Diamonds = ₹${price}`;

  if (outOfStock) {
    pack.style.opacity = "0.4";
    pack.style.pointerEvents = "none";
  } else {
    // Make the new pack selectable
    pack.addEventListener("click", () => {
      document.querySelectorAll(".diamond-option").forEach(o => o.classList.remove("selected"));
      pack.classList.add("selected");
      selectedDiamond = { diamonds, price };
      updateSummary?.();
    });
  }

  // ✅ Append it to the correct section
  document.getElementById("diamondOptions").appendChild(pack);
}
function updateDiamond() {
  const diamonds = document.getElementById('diamondInput').value;
  const newPrice = document.getElementById('priceInput').value;
  const outOfStock = document.getElementById('outOfStockCheckbox').checked;
  const packs = document.querySelectorAll('.diamond-option');
  for (let pack of packs) {
    if (pack.getAttribute('data-diamonds') === diamonds) {
      pack.setAttribute('data-price', newPrice);
      if (outOfStock) {
        pack.style.opacity = "0.4";
        pack.style.pointerEvents = "none";
        pack.textContent = `💎 ${diamonds} Diamonds = ₹${newPrice} (Out of Stock)`;
      } else {
        pack.style.opacity = "1";
        pack.style.pointerEvents = "auto";
        pack.textContent = `💎 ${diamonds} Diamonds = ₹${newPrice}`;
      }
    }
  }
}


function deleteDiamondPack() {
  const targetDiamonds = document.getElementById('deleteDiamonds').value.trim();
  if (!targetDiamonds) return alert("Please enter a diamond amount.");

  const packs = document.querySelectorAll(".diamond-option");
  let found = false;

  packs.forEach(pack => {
    if (pack.getAttribute("data-diamonds") === targetDiamonds) {
      pack.remove();
      found = true;
    }
  });

  if (!found) {
    alert("❌ No pack found with that amount.");
  } else {
    alert("✅ Pack deleted successfully.");
    document.getElementById('deleteDiamonds').value = '';
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const storedPlayerId = localStorage.getItem("playerId");
  const storedServerId = localStorage.getItem("serverId");

  if (storedPlayerId) {
    document.getElementById("playerId").value = storedPlayerId;
  }

  if (storedServerId) {
    document.getElementById("serverId").value = storedServerId;
  }

  if (storedPlayerId || storedServerId) {
    updateSummary?.();
  }
});
