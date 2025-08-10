import React, { useEffect, useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function StudentForm({ onAdd, onUpdate, editingStudent, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', address: '', className: '', phone: '' })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingStudent) {
      setForm({ name: editingStudent.name, email: editingStudent.email, address: editingStudent.address, className: editingStudent.className, phone: editingStudent.phone })
      setErrors({})
    } else {
      setForm({ name: '', email: '', address: '', className: '', phone: '' })
      setErrors({})
    }
  }, [editingStudent])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Họ tên không được để trống'
    else if (form.name.trim().length > 50) e.name = 'Họ tên tối đa 50 ký tự'

    if (!form.email.trim()) e.email = 'Email không được để trống'
    else if (!emailRegex.test(form.email.trim())) e.email = 'Email không hợp lệ'

    if (!form.address.trim()) e.address = 'Địa chỉ không được để trống'
    else if (form.address.trim().length > 100) e.address = 'Địa chỉ quá dài'

    if (!form.className.trim()) e.className = 'Lớp không được để trống'

    if (!form.phone.trim()) e.phone = 'Số điện thoại không được để trống'
    else if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Số điện thoại phải có 10 chữ số'


    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    if (editingStudent) {
      onUpdate({ ...editingStudent, ...form })
    } else {
      onAdd(form)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>{editingStudent ? 'Sửa sinh viên' : 'Thêm sinh viên'}</h3>
      <div className="main-form">
        <div className="form-group">
  <label htmlFor="name">Họ và tên:</label>
  <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ví dụ: Nguyễn Văn A" />
  {errors.name && <div className="error">{errors.name}</div>}
</div>

<div className="form-group">
  <label htmlFor="email">Email:</label>
  <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="ví dụ: abc@gmail.com" />
  {errors.email && <div className="error">{errors.email}</div>}
</div>

<div className="form-group">
  <label htmlFor="address">Địa chỉ:</label>
  <input id="address" name="address" value={form.address} onChange={handleChange} placeholder="Ví dụ: Hà Nội" />
  {errors.address && <div className="error">{errors.address}</div>}
</div>

    <div className="form-group">
  <label htmlFor="className">Lớp:</label>
  <input
    id="className"
    name="className"
    value={form.className}
    onChange={handleChange}
    placeholder="Ví dụ: 64KTPM1"
  />
  {errors.className && <div className="error">{errors.className}</div>}
</div>

<div className="form-group">
  <label htmlFor="phone">Số điện thoại:</label>
  <input
    id="phone"
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder="Ví dụ: 0987654321"
  />
  {errors.phone && <div className="error">{errors.phone}</div>}
</div>

      </div>

      <div className="form-actions">
        <button type="submit" className="btn submit">{editingStudent ? 'Cập nhật' : 'Thêm'}</button>
        <button type="button" className="btn cancel" onClick={onCancel}>Hủy</button>
      </div>
    </form>
  )
}

export default StudentForm
