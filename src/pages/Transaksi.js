import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import {Toast} from 'bootstrap'

export default function Transaksi(props) {
    const { onAdd, onRemove, cartItems, checkout } = props
    const totalPrice=cartItems.reduce((a,c)=>a + c.harga * c.qty, 0)
    let [buku, setBuku] = useState([])
    let [message,setMessage]=useState("")

    const token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };

    let Modelbuku = () => {
        axios.get("http://localhost:8000/book/getbook", token)
            .then(data => {
                setBuku(data.data.buku)
            })
            .catch(error => {
                alert(error)
            })
    }
    let save=()=>{
        let data={
            detail_trans:cartItems
        }
        axios.post("http://localhost:8000/transaksi/save", data, token)
            .then(data => {
                if(data.data.status==true){
                    showToast(data.data.message)
                    checkout()
                } else {
                    showToast(data.data.message)
                }
            })
            .catch(error => {
                alert(error)
            })
    }
    let showToast = (message) => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah utk mengisi state 'message' */
        setMessage(message)
        /** show Toast */
        myToast.show()
    }
    useEffect(() => {
        Modelbuku()

    }, [])
    return (
        <div>
            <Navbar />
            {/* start component Toast */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-info text-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}
            <div className='container mt-3'>
                <h2>TransaksiPenjualan Buku</h2>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className="card">
                            <div className='card-body'>
                                <h5 className='text-center'>Daftar Buku</h5>
                                <div className='row'>
                                    {buku.map((item) => (
                                        <div className='col-md-4 p-2'>
                                            <img className='rounded' height={'100'} src={'http://localhost:8000/covers/' + item.cover} alt={item.judul}></img>
                                            <h3>{item.judul}</h3>
                                            <div>${item.harga}</div>
                                            <div>
                                                <button onClick={() => onAdd(item)}>Add to cart</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="card">
                            <div className='card-body'>
                                <h5 className='text-center'>Cart</h5>
                                {cartItems.length === 0 && <div className='text-center'>Cart is empty</div>}
                                {cartItems.map((item) => (
                                    <div key={item.isbn} className='row mb-2'>
                                        <div className='col-md-4 text-left'>{item.judul}</div>
                                        <div className='col-md-2' style={{"display":"flex"}}>
                                            <button onClick={() => onAdd(item)} className="btn btn-success mb-1 p-1">+</button>
                                            <button onClick={() => onRemove(item)} className="btn btn-danger p-2">-</button>
                                        </div>
                                        <div className='col-md-6' align="right">
                                            {item.qty} x Rp. {item.harga.toFixed(0)}
                                        </div>
                                    </div>
                                ))}
                                {cartItems.length !== 0 && (
                                    <>
                                        <hr></hr>
                                        <div className='row'>
                                            <div className='col-md-6 text-left'><strong>Total Harga</strong></div>
                                            <div className='col-md-6' align="right"><strong>Rp. {totalPrice.toFixed(0)}</strong></div>
                                        </div>
                                    </>
                                )}
                                {cartItems.length !== 0 && <button className='btn btn-primary mt-2' onClick={()=>save()}>Checkout</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
