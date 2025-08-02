$(document).ready(function () {
  if (typeof $.fn.validate === "undefined") {
    console.error("❌ jQuery Validate chưa được tải!");
    return;
  }

  const $form = $('#formNV');
  const $tbody = $("table tbody");

  // 1. Hiển thị dữ liệu từ data.js
  if (typeof dsNV !== "undefined") {
    dsNV.forEach(function (item, index) {
      const row = `
        <tr>
          <td><input type="checkbox" /></td>
          <td>
            <a href="#" class="view" title="Xem"><i class="fa-solid fa-eye"></i></a>
            <a href="#" class="edit" title="Sửa"><i class="material-icons">&#xE254;</i></a>
            <a href="#" class="delete" title="Xóa"><i class="material-icons">&#xE872;</i></a>
          </td>
          <td>${index + 1}</td>
          <td>${item.ten}</td>
          <td>${item.hoDem}</td>
          <td>${item.diaChi}</td>
          <td>${item.hoatDong}</td>
        </tr>
      `;
      $tbody.append(row);
    });
  }

  // 2. Validate form
  $form.validate({
    rules: {
      ten: {
        required: true,
        maxlength: 15
      },
      hoDem: {
        required: true,
        maxlength: 20
      },
      diaChi: {
        required: true,
        maxlength: 50
      }
    },
    messages: {
      ten: {
        required: "Vui lòng nhập tên",
        maxlength: "Tên không được vượt quá 15 ký tự"
      },
      hoDem: {
        required: "Vui lòng nhập họ đệm",
        maxlength: "Họ đệm không được vượt quá 20 ký tự"
      },
      diaChi: {
        required: "Vui lòng nhập địa chỉ",
        maxlength: "Địa chỉ không được vượt quá 50 ký tự"
      }
    },
    errorPlacement: function (error, element) {
      const id = element.attr("id") + "Error";
      $("#" + id).html(error);
    },
    success: function (label, element) {
      const id = $(element).attr("id") + "Error";
      $("#" + id).html(""); // Xóa thông báo lỗi nếu hợp lệ
    },
    submitHandler: function (form) {
      // Nếu hợp lệ, thêm vào bảng
      const stt = $("table tbody tr").length + 1;
      const ten = $("#ten").val();
      const hoDem = $("#hoDem").val();
      const diaChi = $("#diaChi").val();

      const newRow = `
        <tr>
          <td><input type="checkbox" /></td>
          <td>
            <a href="#" class="view" title="Xem"><i class="fa-solid fa-eye"></i></a>
            <a href="#" class="edit" title="Sửa"><i class="material-icons">&#xE254;</i></a>
            <a href="#" class="delete" title="Xóa"><i class="material-icons">&#xE872;</i></a>
          </td>
          <td>${stt}</td>
          <td>${ten}</td>
          <td>${hoDem}</td>
          <td>${diaChi}</td>
          <td>Đang hoạt động</td>
        </tr>
      `;

      $("#bang").append(newRow);

      // Reset form và đóng modal
      form.reset();
      $("#addEmployeeModal").modal("hide");
    }
  });

  // 3. Nút "Thêm" xử lý riêng để không tự đóng modal
  $("#btnThem").click(function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    if ($form.valid()) {
     $("#formNV").valid() && $("#formNV").trigger("submit");
    }
  });
});
