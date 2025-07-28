let rowDangSua = null;

document.getElementById("formSinhVien").addEventListener("submit", function (e) {
  e.preventDefault();

  const maSv = document.getElementById("maSv").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaySinh = document.getElementById("ngaySinh").value;
  const gioiTinhChecked = document.querySelector('input[name="gioiTinh"]:checked');
  const gioiTinh = gioiTinhChecked ? gioiTinhChecked.value : "";
  const ghiChu = document.getElementById("ghiChu").value.trim();

  // Kiểm tra rỗng
  if (maSv === "" || hoTen === "" || email === "" || gioiTinh === "") {
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
    return;
  }

  // Kiểm tra định dạng email
  let regexEmail = /^\S+@\S+\.\S+$/;
  if (!regexEmail.test(email)) {
    alert("Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: abc@gmail.com)");
    return;
  }

  const table = document.getElementById("bangSV").getElementsByTagName("tbody")[0];

  if (rowDangSua) {
    // Cập nhật dòng đang sửa
    rowDangSua.cells[1].innerText = maSv;
    rowDangSua.cells[2].innerText = hoTen;
    rowDangSua.cells[3].innerText = email;
    rowDangSua.cells[4].innerText = gioiTinh;
    rowDangSua.cells[5].innerText = ngaySinh;

    rowDangSua = null;
    document.getElementById("btnThem").innerText = "Thêm sinh viên";
  } else {
    // Thêm mới
    const rowCount = table.rows.length;
    const newRow = table.insertRow();

    newRow.insertCell(0).innerText = rowCount + 1;
    newRow.insertCell(1).innerText = maSv;
    newRow.insertCell(2).innerText = hoTen;
    newRow.insertCell(3).innerText = email;
    newRow.insertCell(4).innerText = gioiTinh;
    newRow.insertCell(5).innerText = ngaySinh;
    newRow.insertCell(6).innerHTML = `
      <button class="edit-btn" onclick="suaDong(this)">Sửa</button>
      <button class="delete-btn" onclick="xoaDong(this)">Xóa</button>
    `;
  }

  // Hiển thị thông báo
  let thongBao = document.getElementById("thongBao");
  thongBao.innerText = "Cập nhật sinh viên thành công";
  thongBao.style.display = "block";

  setTimeout(() => {
    thongBao.innerText = "";
    thongBao.style.display = "none";
  }, 3000);

  this.reset();
});

function xoaDong(button) {
  const xacNhan = confirm("Bạn có chắc chắn muốn xóa sinh viên này không?");
  if (xacNhan) {
    const row = button.parentElement.parentElement;
    row.remove();

    // Cập nhật lại STT
    const table = document.getElementById("bangSV").getElementsByTagName("tbody")[0];
    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerText = i + 1;
    }

    // Nếu đang sửa dòng bị xóa thì hủy sửa
    if (row === rowDangSua) {
      rowDangSua = null;
      document.getElementById("formSinhVien").reset();
      document.getElementById("btnThem").innerText = "Thêm sinh viên";
    }
  }
}

function suaDong(button) {
  rowDangSua = button.parentElement.parentElement;

  const maSv = rowDangSua.cells[1].innerText;
  const hoTen = rowDangSua.cells[2].innerText;
  const email = rowDangSua.cells[3].innerText;
  const gioiTinh = rowDangSua.cells[4].innerText;
  const ngaySinh = rowDangSua.cells[5].innerText;

  document.getElementById("maSv").value = maSv;
  document.getElementById("hoTen").value = hoTen;
  document.getElementById("email").value = email;
  document.getElementById("ngaySinh").value = ngaySinh;

  if (gioiTinh === "Nam") {
    document.getElementById("nam").checked = true;
  } else if (gioiTinh === "Nữ") {
    document.getElementById("nu").checked = true;
  }

  document.getElementById("btnThem").innerText = "Cập nhật sinh viên";
}
