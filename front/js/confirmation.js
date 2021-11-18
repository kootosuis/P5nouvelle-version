let orderId = sessionStorage.getItem("orderId");
let total = sessionStorage.getItem('total');

document.getElementById("total").textContent = total;
document.getElementById("orderId").textContent = orderId;

sessionStorage.removeItem('orderId');
sessionStorage.removeItem('total');
