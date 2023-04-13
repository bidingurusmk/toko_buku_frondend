import React, { Component } from "react"
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Toast } from "bootstrap";
import { Modal } from 'bootstrap'

class Buku extends Component {
    constructor() {
        super();
        this.state = {
            buku: [],
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            aksi: "",
            search: "",
            message:""

        }
    }
    getbuku() {
        axios.get("http://localhost:8000/book/getbook",this.authorization)
            .then(response => {
                this.setState({
                    buku: response.data.buku
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        let token = localStorage.getItem(`token`)
        this.authorization = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        this.getbuku()
        this.modalshow = new Modal(document.getElementById("modal"))
    }
    
    Add = () => {
        this.modalshow.show();
        this.setState({
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: "",
            cover: "",
            action: "insert"
        });

    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onFileChange = event => {
        // Update the state
        this.setState({ cover: event.target.files[0] });
    };
    Save = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("isbn", this.state.isbn);
        formData.append("judul", this.state.judul)
        formData.append("penulis", this.state.penulis)
        formData.append("penerbit", this.state.penerbit)
        formData.append("harga", this.state.harga)

        if (this.state.cover != "") {
            formData.append("cover", this.state.cover, this.state.cover.name);
        }
        let url = "";
        if (this.state.action === "insert") {
            url = "http://localhost:8000/book/insertbook"
            const formData = new FormData();
            formData.append("isbn", this.state.isbn);
            formData.append("judul", this.state.judul)
            formData.append("penulis", this.state.penulis)
            formData.append("penerbit", this.state.penerbit)
            formData.append("harga", this.state.harga)
            if (this.state.cover != "") {
                formData.append("cover", this.state.cover, this.state.cover.name);
            }
            axios.post(url, formData,this.authorization)
                .then(response => {
                    this.showToast(response.data.message)
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    this.getbuku();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal insert');
                });
        } else {
            url = "http://localhost:8000/book/updatebook/" + this.state.isbn
            const formData = new FormData();
            formData.append("isbn", this.state.isbn);
            formData.append("judul", this.state.judul)
            formData.append("penulis", this.state.penulis)
            formData.append("penerbit", this.state.penerbit)
            formData.append("harga", this.state.harga)
            if (this.state.cover != "") {
                formData.append("cover", this.state.cover, this.state.cover.name);
            }
            axios.put(url, formData,this.authorization)
                .then(response => {
                    this.showToast(response.data.message)
                    console.log(response)
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    this.getbuku();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal update');
                });
        }

        // menutup form modal
        this.modalshow.hide();
    }
    Edit = (item) => {
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            harga: item.harga,
            action: "update"
        });
        this.modalshow.show()
    }
    findbuku = (event) => {
        let url = "http://localhost:8000/book/search";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form, this.authorization)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ buku: response.data.buku });
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin?")) {
            let url = "http://localhost:8000/book/dropbook/" + id;
            axios.delete(url, this.authorization)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.getbuku()
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    showToast = (message) => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah utk mengisi state 'message' */
        this.state.message=message

        /** show Toast */
        myToast.show()
    }

    render() {
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
                        {this.state.message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}

                <div className="container">
                    <div className="alert alert-primary">
                        <h3>Daftar Buku</h3>
                        <input type="text" className="form-control mb-2" name="search" value={this.state.search}
                            onChange={this.bind} onKeyUp={this.findbuku} placeholder="Pencarian..." />
                        {/* tampilan tabel pegawai */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Judul</th>
                                    <th>Penulis</th>
                                    <th>Penerbit</th>
                                    <th>Harga</th>
                                    <th>Cover</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.buku.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.isbn}</td>
                                            <td>{item.judul}</td>
                                            <td>{item.penulis}</td>
                                            <td>{item.penerbit}</td>
                                            <td>{item.harga}</td>
                                            <td><img src={"http://localhost:8000/covers/" + item.cover} width="80" />{item.cover}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                    data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.isbn)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={this.Add}
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
                                    <form onSubmit={this.Save}>
                                        <div className="modal-body">
                                            ISBN
                                            <input type="number" name="isbn" value={this.state.isbn} onChange={this.bind}
                                                className="form-control" required />
                                            Judul
                                            <input type="text" name="judul" value={this.state.judul} onChange={this.bind}
                                                className="form-control" required />
                                            Penulis
                                            <input type="text" name="penulis" value={this.state.penulis} onChange={this.bind}
                                                className="form-control" required />
                                            Penerbit
                                            <input type="text" name="penerbit" value={this.state.penerbit} onChange={this.bind}
                                                className="form-control" required />
                                            Harga
                                            <input type="number" name="harga" value={this.state.harga} onChange={this.bind}
                                                className="form-control" required />
                                            Cover
                                            <input type="file" name="cover" onChange={this.onFileChange}
                                                className="form-control" />
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
}
export default Buku;
