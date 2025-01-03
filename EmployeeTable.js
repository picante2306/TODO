import React, { useState } from 'react';
import "./EmployeeTable.css";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', designation: '' });
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrUpdate = () => {
        if (editIndex !== null) {
            const updatedEmployees = employees.map((emp, index) =>
                index === editIndex ? { ...formData } : emp
            );
            setEmployees(updatedEmployees);
            setEditIndex(null);
        } else {
            setEmployees([...employees, { ...formData }]);
        }
        setFormData({ id: '', name: '', designation: '' });
    };

    const handleEdit = (index) => {
        setFormData({ ...employees[index] });
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
    };

    return (
        <div className='employee-container'>
            <h2>Employee Management</h2>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={formData.id}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleAddOrUpdate}>
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;