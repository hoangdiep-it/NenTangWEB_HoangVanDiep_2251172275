$(document).ready(function () {
	const $form = $("#formAddEmployee");
	const $tbody = $("table tbody");
$form.on("submit", function (e) {
    console.log("Form submitted but may be invalid");
});
	// Load dữ liệu từ data.js nếu có
	if (typeof danhSachNhanVien !== "undefined") {
		danhSachNhanVien.forEach(nv => {
			const row = `
				<tr>
					<td>
						<span class="custom-checkbox">
							<input type="checkbox">
							<label></label>
						</span>
					</td>
					<td>${nv.name}</td>
					<td>${nv.email}</td>
					<td>${nv.address}</td>
					<td>${nv.phone}</td>
					<td>
						<a href="#editEmployeeModal" class="edit" data-toggle="modal">
							<i class="material-icons" title="Edit">&#xE254;</i>
						</a>
						<a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
							<i class="material-icons" title="Delete">&#xE872;</i>
						</a>
					</td>
				</tr>
			`;
			$tbody.append(row);
		});
	}
	$.validator.addMethod("regex", function (value, element, regexp) {
  let re = new RegExp(regexp);
  return this.optional(element) || re.test(value);
}, "SĐT phải bắt đầu bằng 0 và có đúng 10 chữ số");

	// Bắt lỗi với jQuery Validation
	$form.validate({
		rules: {
			name: {
				required: true,
				maxlength: 30
			},
			email: {
				required: true,
				email: true
			},
			address: {
				required: true
			},
			phone: {
				required: true,
				regex: /^0\d{9}$/
			}
		},
		messages: {
			name: {
				required: "Vui lòng nhập tên",
				maxlength: "Tên không quá 30 ký tự"
			},
			email: {
				required: "Vui lòng nhập email",
				email: "Email không hợp lệ"
			},
			address: {
				required: "Vui lòng nhập địa chỉ"
			},
			phone: {
				required: "Vui lòng nhập số điện thoại",
				pattern: "SĐT phải bắt đầu bằng 0 và có đúng 10 chữ số"
			}
		},
		errorElement: "div",
		errorClass: "text-danger mt-1",
		errorPlacement: function (error, element) {
		// Xóa lỗi cũ trước khi thêm lỗi mới
		element.next(".text-danger").remove();
		error.insertAfter(element);
	},
		highlight: function (element) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function (element) {
			$(element).removeClass("is-invalid");
		},
		submitHandler: function (form, event) {
			event.preventDefault(); // Ngăn form reload

			const name = $("#name").val();
			const email = $("#email").val();
			const address = $("#address").val();
			const phone = $("#phone").val();

			const newRow = `
				<tr>
					<td>
						<span class="custom-checkbox">
							<input type="checkbox">
							<label></label>
						</span>
					</td>
					<td>${name}</td>
					<td>${email}</td>
					<td>${address}</td>
					<td>${phone}</td>
					<td>
						<a href="#editEmployeeModal" class="edit" data-toggle="modal">
							<i class="material-icons" title="Edit">&#xE254;</i>
						</a>
						<a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
							<i class="material-icons" title="Delete">&#xE872;</i>
						</a>
					</td>
				</tr>
			`;

			
            $tbody.append(newRow);
            $('#addEmployeeModal').modal('hide');
            form.reset();
		}
	});
});

