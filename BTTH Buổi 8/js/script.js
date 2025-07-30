document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('#addEmployeeModal form');
  const tbody = document.querySelector("table tbody");

  // HIỂN THỊ DỮ LIỆU BAN ĐẦU TỪ data.js
  if (typeof danhSachGiaoDich !== "undefined" && Array.isArray(danhSachGiaoDich)) {
    danhSachGiaoDich.forEach(gd => {
      insertRow(gd);
    });
  }

  // Thêm giao dịch mới
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const khachHang = document.getElementById("khachHang").value.trim();
      const nhanVien = document.getElementById("nhanVien").value.trim();
      const soTien = document.getElementById("soTien").value.trim();

      const newGiaoDich = {
        id: Math.floor(Math.random() * 10000),
        khachHang,
        nhanVien,
        soTien,
        ngayMua: new Date().toLocaleString()
      };

      insertRow(newGiaoDich);

      // Reset form & đóng modal
      form.reset();
      clearErrors();
      $('#addEmployeeModal').modal('hide');
    }
  });

  // Xoá dòng
  tbody.addEventListener("click", function (e) {
    if (e.target.closest(".delete")) {
      e.preventDefault();
      const row = e.target.closest("tr");
      if (confirm("Bạn có chắc chắn muốn xóa giao dịch này không?")) {
        row.remove();
      }
    }
  });

  // Hàm thêm dòng vào bảng
  function insertRow(gd) {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>
      <a href="#" class="view" title="Xem"><i class="fa-solid fa-eye"></i></a>
        <a href="#" class="edit" title="Sửa"><i class="material-icons">&#xE254;</i></a>
        <a href="#" class="delete" title="Xóa"><i class="material-icons">&#xE872;</i></a>
      </td>
      <td>${gd.id}</td>
      <td>${gd.khachHang}</td>
      <td>${gd.nhanVien}</td>
      <td>${gd.soTien}</td>
      <td>${gd.ngayMua}</td>
    `;
  }

  // Hàm kiểm tra dữ liệu form
  function validateForm() {
    let isValid = true;
    const fields = ['khachHang', 'nhanVien', 'soTien'];

    fields.forEach(field => {
      const input = document.getElementById(field);
      const value = input.value.trim();
      const errorElement = document.getElementById(field + 'Error');

      input.classList.remove('input-error');
      errorElement.textContent = '';
      errorElement.style.color = 'red';

      if (!value) {
        errorElement.textContent = 'Trường này không được để trống';
        input.classList.add('input-error');
        isValid = false;
      } else if (value.length > 30) {
        errorElement.textContent = 'Không được quá 30 ký tự';
        input.classList.add('input-error');
        isValid = false;
      }
    });

    return isValid;
  }

  function clearErrors() {
    const fields = ['khachHang', 'nhanVien', 'soTien'];
    fields.forEach(field => {
      const input = document.getElementById(field);
      const errorElement = document.getElementById(field + 'Error');
      input.classList.remove('input-error');
      errorElement.textContent = '';
    });
  }
});
