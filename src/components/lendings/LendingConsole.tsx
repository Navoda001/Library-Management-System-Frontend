import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditLending from './EditLending';
import AddLending from './AddLending';
import { AddLendingData, DeleteLending, GetLendings, UpdateLending } from '../../service/LendingData';
import styles from "./lendingstyle.module.css"

export const LendingConsole = () => {
    interface Lending {
        lendingId:string;
        book:string;
        member:string;
      }

    const [lendingData, setLendingData] = useState<Lending[]>([])
    const [selectedRow, setSelectedRow] = useState<Lending | null>(null)
    const [showEditLendingForm, setShowEditLendingForm] = useState(false)
    const [showAddLendingForm, setShowAddForm] = useState(false)
    //add useEffect to load Table
    useEffect(() => {
        const loadData = async () => {
            const lendingDetails = await GetLendings()
            console.log(lendingDetails)
            setLendingData(lendingDetails)
        }
        loadData();
    }, [])
    const tHeads: String[] = [
        "Lending Id",
        "Book Id",
        "Member Id",
        "Lending Date",
        "Return Date",
        "isActiveLending",
        "OverDue Days",
        "Fine Amount",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Lending) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditLendingForm(true)
    }
    const handleClose = () => setShowEditLendingForm(false);
    const handleUpdate = (updatedLending: Lending) => {
        const updatedLendings = lendingData.map((lending) =>
            lending.lendingId === updatedLending.lendingId ? updatedLending : lending
        );
        setLendingData(updatedLendings)
    }
    //handle delete
    const handleDelete = async (lendingId: String) => {
        console.log(lendingId)
        try {
            await DeleteLending(lendingId)
            setLendingData(lendingData.filter((lending) => lending.lendingId !== lendingId))

        } catch (err) {
            console.error("Delete Lending failed with ", err)
        }

    }

    const handleAdd = (newLending: Lending) => {
        setLendingData((prevData) => [...prevData, newLending])
    }

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Lendings</Button>
            </div>
            <h1 className={styles.lendingTitle}>Lending Console</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {lendingData.map((row) => (
                        <tr>
                            {Object.values(row).map((cell, index) => (
                                <td>
                                    {cell}
                                </td>
                            ))}
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.lendingId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditLending
                show={showEditLendingForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateLending={UpdateLending}
            />
            <AddLending
                show={showAddLendingForm}
                handleOnClose={() => setShowAddForm(false)} //pass the function as prop
                handleAdd={handleAdd}
                addBook={AddLendingData}
            />
        </>
    );
};
