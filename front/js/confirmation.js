let orderId = sessionStorage.getItem("orderId");
let total = sessionStorage.getItem("total");

document.getElementById("total").textContent = JSON.parse(total);
document.getElementById("orderId").textContent = JSON.parse(orderId);

sessionStorage.removeItem("orderId");
sessionStorage.removeItem("total");
