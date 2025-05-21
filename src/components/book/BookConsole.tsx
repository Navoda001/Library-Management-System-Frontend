import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditBook from './EditBook';
import AddBook from './AddBook';
import { AddBookData, DeleteBook, GetBooks, UpdateBook } from '../../service/BookData';
import styles from "./bookstyle.module.css"
import { useNavigate } from 'react-router'
import { UnAuth } from '../auth/UnAuth';
import Swal from "sweetalert2";

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
    const navigate = useNavigate();
    const [bookData, setBookData] = useState<Book[]>([])
    const [selectedRow, setSelectedRow] = useState<Book | null>(null)
    const [showEditBookForm, setShowEditBookForm] = useState(false)
    const [showAddBookForm, setShowAddForm] = useState(false)
    //add useEffect to load table data
    useEffect(() => {
        //  const laodData = async () =>{
        //     const bookDetails = await GetBooks()
        //     console.log(bookDetails)
        //     setBookData(bookDetails)
        //  };
        //  laodData();
        fetchBooks();
    }, [])

    const fetchBooks = async () => {
        try {
            const books = await GetBooks();
            setBookData(books);
        } catch (error) {
            navigate("/unauth")
            console.error("Error fetching books:", error);
        }
    };
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
    const handleClose =  () => setShowEditBookForm(false);
    const handleUpdate = async (updatedBook: Book) => {
        const updatedBooks = bookData.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
        );
        setBookData(updatedBooks)

        await Swal.fire({
            title: "Success!",
            text: "Book details updated successfully",
            icon: "success",
            confirmButtonText: "OK"
        });
    }
    //handle delete
    const handleDelete = async (bookId: string) => {
        //impl custom alerts
        const result = await Swal.fire({
            title: "Are you sure to delete this record?",
            text: "The process cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        });
        if (result.isConfirmed) {
            try {
                await DeleteBook(bookId)
                setBookData(bookData.filter((book) => book.bookId !== bookId))
            } catch (err) {
                console.error("Delete book failed with ", err)
            }
        }
    }

    const handleAdd = (newBook: Book) => {
        setBookData((prevData) => [...prevData, newBook])
    }

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Books</Button>
            </div>
            <h1 className={styles.bookTitle} >Book Console</h1>
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
                updateBook={UpdateBook}
            />
            <AddBook
                show={showAddBookForm}
                handleOnClose={() => setShowAddForm(false)} //pass the function as prop
                handleAdd={handleAdd}
                addBook={AddBookData}
            />
        </>
    );
};
