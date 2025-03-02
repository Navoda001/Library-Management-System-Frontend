import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditMember from './EditStaffMember';
import AddMember from './AddStaffMember';
import { AddStaffData, UpdateStaff, DeleteStaff, GetStaff } from '../../service/StaffData';

export const StaffMemberConsole = () => {
    interface Staff {
        staffId:string;
        firstName:string;
        lastName:string;
        email:string;
        joinDate:string;
        phone:string;
        role:string;
      }

    const [staffData, setStaffData] = useState<Staff[]>([])
    const [selectedRow, setSelectedRow] = useState<Staff | null>(null)
    const [showEditStaffForm, setShowEditStaffForm] = useState(false)
    const [showAddStaffForm,setShowAddForm] = useState(false)
    //add useEffect to load Table
    useEffect(() => {
        const loadData = async () => {
            const staffDetails = await GetStaff()
            console.log(staffDetails)
            setStaffData(staffDetails)
        }
        loadData();
    }, [])
    const tHeads: String[] = [
        "Staff Id",
        "First Name",
        "Last Name",
        "Email",
        "Join Date",
        "Last Update Date",
        "Last Update Time",
        "Phone",
        "Role",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Staff) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditStaffForm(true)
    }
    const handleClose = () => setShowEditStaffForm(false);
    const handleUpdate = (updatedStaff: Staff) => {
        const updatedStaffs = staffData.map((staff) =>
            staff.staffId === updatedStaff.staffId ? updatedStaff : staff
        );
        setStaffData(updatedStaffs)
    }
    //handle delete
    const handleDelete = async (staffId: string) => {
        console.log(staffId)
        try {
            await DeleteStaff(staffId)
           setStaffData(staffData.filter((staff)=> staff.staffId !== staffId))
           
        } catch (err) {
            console.error("Delete member failed with ", err)
        }

    }

    const handleAdd = (newStaff :Staff) => {
            setStaffData((prevData) => [...prevData,newStaff])
    }
    
    return (
        <>
        <div className='d-flex justify-content-end p-3'>
        <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Staff Member</Button>
        </div>
            <h1 className='text-center p-3 fw-bold fs-1' >Staff Member Console</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {staffData.map((row) => (
                        <tr>
                            {Object.values(row).map((cell, index) => (
                                <td>
                                    {cell}
                                </td>
                            ))}
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.staffId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditMember
                show={showEditStaffForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateStaff = {UpdateStaff}
            />
            <AddMember
            show = {showAddStaffForm}
            handleOnClose={() => setShowAddForm(false)} //pass the function as prop
            handleAdd = {handleAdd}
            addStaff = {AddStaffData}
            />
        </>
    );
};
