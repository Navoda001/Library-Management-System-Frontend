import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { GetBooks } from '../service/Books/GetBooks';
import EditBook from './EditBook';
import { DeleteBook } from '../service/Books/DeleteBook';

export const BookConsole = () => {
    interface Book {
        bookId: String;
        bookName: String;
        author: String;
        edition: String;
        publisher: String;
        isbn: String;
        price: number;
        totalQty: number;
        availableQty: number;
        lastUpdateDate: String;
        lastUpdateTime: String;
    }

    const [bookData, setBookData] = useState<Book[]>([])
    const [selectedRow, setSelectedRow] = useState<Book | null>(null)
    const [showEditBookForm, setShowEditBookForm] = useState(false)

    //add useEffect to load Table
    useEffect(() => {
        const loadData = async () => {
            const bookDetails = await GetBooks()
            console.log(bookDetails)
            setBookData(bookDetails)
        }
        loadData();
    }, [])
    const tHeads: String[] = [
        "Book Id",
        "Book Name",
        "Author",
        "Edition",
        "Publisher",
        "ISBN",
        "Price",
        "Total Qty",
        "Available Qty",
        "Last Update Date",
        "Last Update Time",
        "Action"
    ];
    //handle edit function
    const handleEdit = (row: Book) => {
        console.log("handle Edit", row)
        setSelectedRow(row)
        setShowEditBookForm(true)
    }
    const handleClose = () => setShowEditBookForm(false);
    const handleUpdate = (updatedBook: Book) => {
        const updatedBooks = bookData.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
        );
        setBookData(updatedBooks)
    }
    //handle delete
    const handleDelete = async (bookId: String) => {
        console.log(bookId)
        try {
            await DeleteBook(bookId)
           setBookData(bookData.filter((book)=> book.bookId !== bookId))
           
        } catch (err) {
            console.error("Delete book failed with ", err)
        }

    }
    return (
        <>
            <h1 className='text-center p-3 fw-bold fs-1' >Books</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((row) => (
                        <tr>
                            {Object.values(row).map((cell, index) => (
                                <td>
                                    {cell}
                                </td>
                            ))}
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.bookId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditBook
                show={showEditBookForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
            />
        </>
    );
};
