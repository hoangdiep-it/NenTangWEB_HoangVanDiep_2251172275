import React, { useState, useEffect } from 'react'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import './App.css';


function App() {
 

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : [
       { id: 1, name: 'Nguyễn Văn Vỹ', email: 'vy@gmail.com', address: 'Hà Nội', className: '64KTPM1', phone: '0345678925' },
        { id: 2, name: 'Trần Thị Hương', email: 'huong@gmail.com', address: 'Hải Phòng', className: '64KTPM2', phone: '0987654321' }
    ]
  })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addStudent = (student) => {
    setStudents(prev => [...prev, { ...student, id: Date.now() }])
    setShowForm(false)
  }

  const startEdit = (student) => {
    setEditing(student)
    setShowForm(true)
  }

  const updateStudent = (updated) => {
    setStudents(prev => prev.map(s => (s.id === updated.id ? updated : s)))
    setEditing(null)
    setShowForm(false)
  }

  const deleteStudent = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  const openAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const cancelForm = () => {
    setEditing(null)
    setShowForm(false)
  }

  return (
    <div id="root-container">
      <div className="container">
        <header className="header">
          <h1>Quản lý Sinh viên</h1>
          
        </header>
<button className="btn-add" onClick={openAdd}> Thêm sinh viên</button>
        <StudentList
          students={students}
          onEdit={startEdit}
          onDelete={deleteStudent}
        />

        {showForm && (
          <div className="popup-overlay" onClick={cancelForm}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
              <StudentForm
                key={editing ? editing.id : 'new'}
                onAdd={addStudent}
                onUpdate={updateStudent}
                editingStudent={editing}
                onCancel={cancelForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
