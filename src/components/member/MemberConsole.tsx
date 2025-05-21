import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditMember from './EditMember';
import AddMember from './AddMember';
import { AddMemberData, UpdateMember, DeleteMember, GetMembers } from '../../service/MemberData';
import style from "./memberstyle.module.css"

export const MemberConsole = () => {
    interface Member {
        memberId: string;
        name: string;
        email: string;
    }

    const [memberData, setMemberData] = useState<Member[]>([])
    const [selectedRow, setSelectedRow] = useState<Member | null>(null)
    const [showEditMemberForm, setShowEditMemberForm] = useState(false)
    const [showAddMemberForm,setShowAddForm] = useState(false)
    //add useEffect to load Table
    useEffect(() => {
        const loadData = async () => {
            const memberDetails = await GetMembers()
            console.log(memberDetails)
            setMemberData(memberDetails)
        }
        loadData();
    }, [])
    const tHeads: String[] = [
        "Member Id",
        "Member Name",
        "E mail",
        "Member Ship Date",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Member) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditMemberForm(true)
    }
    const handleClose = () => setShowEditMemberForm(false);
    const handleUpdate = (updatedMember: Member) => {
        const updatedMembers = memberData.map((member) =>
            member.memberId === updatedMember.memberId ? updatedMember : member
        );
        setMemberData(updatedMembers)
    }
    //handle delete
    const handleDelete = async (memberId: string) => {
        console.log(memberId)
        try {
            await DeleteMember(memberId)
           setMemberData(memberData.filter((member)=> member.memberId !== memberId))
           
        } catch (err) {
            console.error("Delete member failed with ", err)
        }

    }

    const handleAdd = (newMember :Member) => {
            setMemberData((prevData) => [...prevData,newMember])
    }
    
    return (
        <>
        <div className='d-flex justify-content-end p-3'>
        <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Member</Button>
        </div>
            <h1 className={style.memberTitle} >Member Console</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {memberData.map((row) => (
                        <tr>
                            {Object.values(row).map((cell, index) => (
                                <td>
                                    {cell}
                                </td>
                            ))}
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.memberId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditMember
                show={showEditMemberForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateMember = {UpdateMember}
            />
            <AddMember
            show = {showAddMemberForm}
            handleOnClose={() => setShowAddForm(false)} //pass the function as prop
            handleAdd = {handleAdd}
            addMember = {AddMemberData}
            />
        </>
    );
};
