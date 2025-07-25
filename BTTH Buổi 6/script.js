document.getElementById("btnThem").addEventListener("click", function(){alert("Them thanh cong");});

document.getElementById("formSinhVien").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const maSv = document.getElementById("maSv").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaySinh = document.getElementById("ngaySinh").value;
  const gioiTinhChecked = document.querySelector('input[name="gioiTinh"]:checked');
  const gioiTinh = gioiTinhChecked ? gioiTinhChecked.value : "";
  const ghiChu = document.getElementById("ghiChu").value.trim();

  if (!maSv || !hoTen || !email || !gioiTinh) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  // Thêm dòng mới vào bảng
  const table = document.getElementById("bangSV").getElementsByTagName("tbody")[0];
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

let thongBao = document.getElementById("thongBao");
thongBao.innerText = "Thêm sinh viên thành công";
thongBao.style.display = "block"; // Hiện thông báo

setTimeout(() => {
  thongBao.innerText = "";
  thongBao.style.display = "none"; // Ẩn thông báo sau 3 giây
}, 3000);

 document.getElementById("formSinhVien").reset();


  this.reset(); // Reset form
});


