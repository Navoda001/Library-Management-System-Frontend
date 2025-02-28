import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/GetBooks';

export const BookConsole = () => {
    interface Book{
        bookId:String;
        bookName:String;
        author:String;
        edition:String;
        publisher:String;
        isbn:String;
        price:number;
        totalQty:number;
        availableQty:String;
        lastUpdateDate:String;
        lastUpdateTime:String;
    }
    const [bookData , setBookData] = useState<Book[]>([])

    //add useEffect to load Table
    useEffect(()=>{
        const loadData = async () =>{
            const bookDetails = await GetBooks()
            console.log(bookDetails)
            setBookData(bookDetails)
        }
        loadData();
    },[])
    const tHeads : String [] = [
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
            "Last Update Time"
    ];

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {tHeads.map((headings) =>(
                             <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((row) => (
                        <tr>
                           {Object.values(row).map((cell,index)=>(
                            <td>
                                {cell}
                            </td>
                           ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
            );
};
