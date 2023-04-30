import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { Modal } from 'bootstrap'
import { Toast } from 'bootstrap'
import axios from 'axios'

export default function Admin() {
    const [message, setMessage] = useState("")
    const [modal, setModal] = useState("")
    const [admin, setAdmin] = useState([])
    const [id_admin, setId_admin] = useState("")
    const [nama_admin, setNama_admin] = useState("")
    const [role, setRole] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [aksi, setAksi] = useState("")
    const [search, setSearch] = useState("")

    let token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
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
    let getAdmin = () => {
        axios.get("http://localhost:8000/admin", token)
            .then(res => {
                setAdmin(res.data.admin)
            })
    }
    let Add = () => {
        setId_admin("")
        setNama_admin("")
        setRole("")
        setUsername("")
        setPassword("")
        setAksi("insert")
        modal.show()
    }
    let Drop = (id) => {
        if (window.confirm("Apakah anda yakin?")) {
            let url = "http://localhost:8000/admin/dropadmin/" + id;
            axios.delete(url, token)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    getAdmin()
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    let Edit = (data) => {
        setId_admin(data.id_admin)
        setNama_admin(data.nama_admin)
        setRole(data.role)
        setUsername(data.username)
        setPassword(data.password)
        setAksi("update")
        modal.show()
    }
    let Save = (e) => {
        e.preventDefault();
        let data = {
            nama_admin: nama_admin,
            role: role,
            username: username,
            password: password
        }
        let url = "";
        if (aksi === "insert") {
            url = "http://localhost:8000/admin/insertadmin"

            axios.post(url, data, token)
                .then(response => {
                    showToast(response.data.message)
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    getAdmin();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal insert');
                });
        } else {
            url = "http://localhost:8000/admin/updateadmin/" + id_admin
            axios.put(url, data, token)
                .then(response => {
                    showToast(response.data.message)
                    console.log(response)
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    getAdmin();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal update');
                });
        }

        // menutup form modal
        modal.hide();
    }
    let findadmin = (event) => {
        setSearch(event.target.value)
        let url = "http://localhost:8000/admin/search";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: search
            }
            // mengakses api untuk mengambil data admin
            // berdasarkan keyword
            axios.post(url, form, token)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    setAdmin(response.data.admin);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    useEffect(() => {
        let mymodal = new Modal(window.document.getElementById("modal"))
        setModal(mymodal)
        getAdmin()
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

            <div className="container">
                <div className="alert alert-primary">
                    <h3>Daftar Admin</h3>
                    <input type='text' className='form-control' onKeyUp={findadmin} onChange={findadmin}/>
                    {/* tampilan tabel pegawai */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Admin</th>
                                <th>Nama Admin</th>
                                <th>Role</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_admin}</td>
                                        <td>{item.nama_admin}</td>
                                        <td>{item.role}</td>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => Edit(item)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger m-1" onClick={() => Drop(item.id_admin)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={Add}
                        data-toggle="modal">
                        Tambah Data
                    </button>
                    {/* modal form buku */}
                    <div className="modal fade" id="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    Form Buku
                                </div>
                                <form onSubmit={Save}>
                                    <div className="modal-body">
                                        <input type="hidden" name="id_admin" value={id_admin} onChange={ev => setId_admin(ev.target.value)}
                                            className="form-control" required />
                                        Nama Admin
                                        <input type="text" name="nama_admin" value={nama_admin} onChange={ev => setNama_admin(ev.target.value)}
                                            className="form-control" required />
                                        Role
                                        <input type="text" name="role" value={role} onChange={ev => setRole(ev.target.value)}
                                            className="form-control" required />
                                        Username
                                        <input type="text" name="username" value={username} onChange={ev => setUsername(ev.target.value)}
                                            className="form-control" required />
                                        Password
                                        <input type="text" name="password" value={password} onChange={ev => setPassword(ev.target.value)}
                                            className="form-control" required />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-sm btn-success" type="submit">
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
