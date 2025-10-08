const API_URL_ROOT = 'https://www.thespruce.com/gardening-4127780'

function renderProducts(products) {
    const container = document.getElementById("product_list");
    container.innerHTML = "";
}


function loadProductsFromAPI() {
    fetch(API_URL_ROOT + "products", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            renderProducts(data.products);
        })
        .catch((err) => console.error("Lol API:", err));
}

document.addEventListener('DOMContentLoaded', function () {
    loadProductsFromAPI();
});