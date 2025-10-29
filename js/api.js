// ===============================
// EasyGardening API display script
// ===============================
const API_KEY = "sk-krr3690203ed0df5a13187"; // 👉 Điền key API của bạn tại đây

const plantList = document.getElementById("plant_list");
const diseaseList = document.getElementById("disease_list");
const modal = new bootstrap.Modal(document.getElementById("detailModal"));
const detailContent = document.getElementById("detailContent");
const modalTitle = document.getElementById("detailModalLabel");

// ----------------------
// Render danh sách cards
// ----------------------
function renderCards(container, items, type = "plant") {
  container.innerHTML = "";

  if (!items || items.length === 0) {
    container.innerHTML = `<p class="text-center">No ${type}s found.</p>`;
    return;
  }

  items.forEach((item) => {
    const id = item.id;
    const name = item.common_name || item.name || "Unknown";
    const img =
      item.default_image?.original_url ||
      item.image_url ||
      "https://via.placeholder.com/300x200?text=No+Image";

    let scientific = "";
    if (Array.isArray(item.scientific_name)) {
      scientific = item.scientific_name.join(", ");
    } else if (typeof item.scientific_name === "string") {
      scientific = item.scientific_name;
    }

    const html = `
      <div class="col">
        <div class="card shadow-sm h-100">
          <img src="${img}" class="bd-placeholder-img card-img-top" alt="${name}">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${name}</h6>
            ${scientific ? `<p class="card-text small text-muted">${scientific}</p>` : ""}
            <button class="btn btn-sm btn-outline-primary mt-auto" 
              data-id="${id}" data-type="${type}">Xem chi tiết</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });

  // Thêm sự kiện click cho các nút "Xem chi tiết"
  container.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const type = e.target.getAttribute("data-type");
      showDetail(id, type);
    });
  });
}

// ----------------------
// Load danh sách chính
// ----------------------
async function loadPlants() {
  try {
    const res = await fetch(`https://perenual.com/api/species-list?key=${API_KEY}&page=1`);
    const data = await res.json();
    renderCards(plantList, data.data, "plant");
  } catch (error) {
    console.error(error);
    plantList.innerHTML = `<p class="text-danger text-center">Failed to load plants.</p>`;
  }
}

async function loadDiseases() {
  try {
    const res = await fetch(`https://perenual.com/api/pest-disease-list?key=${API_KEY}&page=1`);
    const data = await res.json();
    renderCards(diseaseList, data.data, "disease");
  } catch (error) {
    console.error(error);
    diseaseList.innerHTML = `<p class="text-danger text-center">Failed to load diseases.</p>`;
  }
}

// ----------------------
// Hiển thị chi tiết trong popup
// ----------------------
async function showDetail(id, type) {
  modalTitle.textContent = "Đang tải...";
  detailContent.innerHTML = `<div class="spinner-border text-success" role="status"></div>`;
  modal.show();

  try {
    let res, data;
    if (type === "plant") {
      res = await fetch(`https://perenual.com/api/species/details/${id}?key=${API_KEY}`);
    } else {
      res = await fetch(`https://perenual.com/api/pest-disease/details/${id}?key=${API_KEY}`);
    }
    data = await res.json();

    // Xử lý dữ liệu hiển thị
    const name = data.common_name || data.name || "Unknown";
    const img =
      data.default_image?.original_url ||
      data.image_url ||
      "https://via.placeholder.com/400x250?text=No+Image";

    modalTitle.textContent = name;

    let html = `
      <img src="${img}" alt="${name}" class="img-fluid rounded mb-3" />
    `;

    if (type === "plant") {
      html += `
        <p><strong>Scientific name:</strong> ${data.scientific_name?.join?.(", ") || data.scientific_name || "N/A"}</p>
        <p><strong>Cycle:</strong> ${data.cycle || "N/A"}</p>
        <p><strong>Watering:</strong> ${data.watering || "N/A"}</p>
        <p><strong>Sunlight:</strong> ${Array.isArray(data.sunlight) ? data.sunlight.join(", ") : data.sunlight || "N/A"}</p>
      `;
    } else {
      html += `
        <p><strong>Scientific name:</strong> ${data.scientific_name || "N/A"}</p>
        <p><strong>Symptoms:</strong> ${data.symptoms || "N/A"}</p>
        <p><strong>Treatment:</strong> ${data.treatment || "N/A"}</p>
      `;
    }

    detailContent.innerHTML = html;
  } catch (error) {
    console.error(error);
    modalTitle.textContent = "Lỗi tải dữ liệu";
    detailContent.innerHTML = `<p class="text-danger">Không thể tải chi tiết.</p>`;
  }
}

// ----------------------
// Load khi vào trang
// ----------------------
window.addEventListener("DOMContentLoaded", () => {
  loadPlants();
  loadDiseases();
});
