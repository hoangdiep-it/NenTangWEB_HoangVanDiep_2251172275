import React from 'react'
import StudentItem from './StudentItem'

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="list-wrap"  >
      <h2  >Danh sách sinh viên</h2>
      <table className="student-table" role="table">
        <thead>
          <tr  >
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Lớp</th>
            <th>SĐT</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty">Chưa có sinh viên</td>
            </tr>
          ) : (
            students.map((s, idx) => (
              <StudentItem
                key={s.id}
                index={idx}
                student={s}
                onEdit={() => onEdit(s)}
                onDelete={() => onDelete(s.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
