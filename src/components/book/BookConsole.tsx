import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditBook from './EditBook';
import AddBook from './AddBook';
import { AddBookData,DeleteBook,GetBooks,UpdateBook } from '../../service/BookData';

export const BookConsole = () => {
    interface Book {
        bookId: string;
        bookName: string;
        author: string;
        edition: string;
        publisher: string;
        isbn: string;
        price: number;
        totalQty: number;
        availableQty: number;
    }

    const [bookData, setBookData] = useState<Book[]>([])
    const [selectedRow, setSelectedRow] = useState<Book | null>(null)
    const [showEditBookForm, setShowEditBookForm] = useState(false)
    const [showAddBookForm,setShowAddForm] = useState(false)
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

    const handleAdd = (newBook :Book) => {
            setBookData((prevData) => [...prevData,newBook])
    }
    
    return (
        <>
        <div className='d-flex justify-content-end p-3'>
        <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Books</Button>
        </div>
            <h1 className='text-center p-3 fw-bold fs-1' >Book Console</h1>
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
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.bookId)}>ssss</Button>
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
                updateBook = {UpdateBook}
            />
            <AddBook
            show = {showAddBookForm}
            handleOnClose={() => setShowAddForm(false)} //pass the function as prop
            handleAdd = {handleAdd}
            addBook = {AddBookData}
            />
        </>
    );
};
