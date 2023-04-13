import React, { Component } from "react"
import Navbar from '../Components/Navbar'
class Tambah_data extends Component {
    constructor(){
        super()
        this.state={
            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    Tambah Data
                    <form onSubmit={ev => this.Save(ev)}>
                        Judul Buku
                        <input type="text" className="form-control mb-2"
                            value={this.state.judul}
                            onChange={ev => this.setState({ judul: ev.target.value })}
                            required />

                        Penulis Buku
                        <input type="text" className="form-control mb-2"
                            value={this.state.penulis}
                            onChange={ev => this.setState({ penulis: ev.target.value })}
                            required />

                        Penerbit Buku
                        <input type="text" className="form-control mb-2"
                            value={this.state.penerbit}
                            onChange={ev => this.setState({ penerbit: ev.target.value })}
                            required />

                        Harga Buku
                        <input type="number" className="form-control mb-2"
                            value={this.state.harga}
                            onChange={ev => this.setState({ harga: ev.target.value })}
                            required />

                        Cover Buku
                        <input type="url" className="form-control mb-2"
                            value={this.state.cover}
                            onChange={ev => this.setState({ cover: ev.target.value })}
                            required />

                        <button className="btn btn-info btn-block" type="submit">
                            Simpan
                        </button>
                    </form>

                </div>
            </div>

        )
    }
}
export default Tambah_data;
