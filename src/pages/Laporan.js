import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Modal } from 'bootstrap'

export default function Laporan() {
    const [laporan, setLaporan] = useState([])
    const [modal, setModal] = useState("")
    const [detail_trans,setDetail_trans]=useState([])
    const [totalPrice,settotalPrice]=useState(0)
    let token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    let detail = (id) => {
        axios.get("http://localhost:8000/admin/getdetaillaporan/"+id, token)
            .then(res => {
                setDetail_trans(res.data.data)
                settotalPrice(res.data.data.reduce((a,c)=>a + c.harga * c.qty, 0))
            })
        modal.show()
    }
    let getlaporan = () => {
        axios.get("http://localhost:8000/admin/laporan", token)
            .then(res => {
                setLaporan(res.data.data)
            })
    }
    useEffect(() => {
        let mymodal = new Modal(document.getElementById("modal"))
        setModal(mymodal)
        getlaporan()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="alert alert-primary">
                    <h3>Laporan Transaksi</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Tgl</th>
                                <th>Grand Total</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {laporan.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_transaksi}</td>
                                        <td>{item.tgl}</td>
                                        <td>{item.grandtotal}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => detail(item.id_transaksi)}>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            Detail Transaksi
                        </div>

                        <div className="modal-body">
                            <table className='table table-hover table-striped'>
                                <thead>
                                    <tr>
                                        <th>NO</th><th>Nama Buku</th><th>Harga</th><th>QTY</th><th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail_trans.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td><td>{item.judul}</td><td>{item.harga}</td><td>{item.qty}</td><td>{item.qty*item.harga}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            Grand Total : {totalPrice}
                        </div>
                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
