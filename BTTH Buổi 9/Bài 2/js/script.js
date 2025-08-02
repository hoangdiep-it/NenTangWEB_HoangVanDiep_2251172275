$(document).ready(function () {
    const $form = $('#formGiaoDich');
    const $tbody = $("table tbody");

    // 1. Hiển thị dữ liệu từ data.js
    if (typeof danhSachGiaoDich !== "undefined") {
        danhSachGiaoDich.forEach(function (item) {
            const row = `
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>
                      <a href="#" class="view" title="Xem"><i class="fa-solid fa-eye"></i></a>
                        <a href="#" class="edit" title="Sửa"><i class="material-icons">&#xE254;</i></a>
                        <a href="#" class="delete" title="Xóa"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    <td>${item.id}</td>
                    <td>${item.khachHang}</td>
                    <td>${item.nhanVien}</td>
                    <td>${item.soTien}</td>
                    <td>${item.ngayMua}</td>
                </tr>
            `;
            $tbody.append(row);
        });
    }

    // 2. Validate form thêm giao dịch
    $form.validate({
        rules: {
            khachHang: {
                required: true,
                maxlength: 30
            },
            nhanVien: {
                required: true,
                maxlength: 30
            }
        },
        messages: {
            khachHang: {
                required: "Tên khách hàng không được để trống",
                maxlength: "Tên khách hàng không được vượt quá 30 ký tự"
            },
            nhanVien: {
                required: "Tên nhân viên không được để trống",
                maxlength: "Nhân viên không được vượt quá 30 ký tự"
            }
        },
        errorPlacement: function (error, element) {
            const id = element.attr("id") + "Error";
            $("#" + id).html(error);
        },
        success: function (label, element) {
            const id = $(element).attr("id") + "Error";
            $("#" + id).html("");
        },
        submitHandler: function (form, event) {
            event.preventDefault();

            // 3. Tạo dòng mới và thêm vào bảng
            const khachHang = $("#khachHang").val();
            const nhanVien = $("#nhanVien").val();
            const soTien = $("#soTien").val();
            const ngayMua = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
            const id = $("table tbody tr").length + 1;

            const newRow = `
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>
                        <a href="#" class="edit" title="Sửa"><i class="material-icons">&#xE254;</i></a>
                        <a href="#" class="delete" title="Xóa"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    <td>${id}</td>
                    <td>${khachHang}</td>
                    <td>${nhanVien}</td>
                    <td>${soTien}</td>
                    <td>${ngayMua}</td>
                </tr>
            `;

            $tbody.append(newRow);
            $('#addEmployeeModal').modal('hide');
            form.reset();
        }
    });

    // 4. Checkbox chọn tất cả
    const checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        checkbox.prop("checked", this.checked);
    });

    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});
