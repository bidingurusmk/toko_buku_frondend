import React, { Component } from "react"
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import {Link} from "react-router-dom"
import {Modal} from 'bootstrap'

class Gallery extends Component {

    constructor() {
        super();
        this.state = {
            buku: [
                {
                    isbn: "1234", judul: "matematika", penulis: "sugeng",
                    penerbit: "CV harapan cinta", harga: 10000,
                    cover: "https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
                },
                {
                    isbn: "12346", judul: "Anak Badai", penulis: "Tere Liye",
                    penerbit: "CV Nusa Bangsa", harga: 80000,
                    cover: "https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
                }
            ],
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
    componentDidMount(){
        this.show_modal=new Modal(document.getElementById("modal-member"));
    }
    add() {
        this.show_modal.show()
        this.setState({
            isbn: Math.random(1, 10000000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }
    Edit(item) {
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: 'update',
            selectedItem: item
        })
        this.show_modal.show()
    }
    
    Save(event) {
        event.preventDefault()
        let temp = this.state.buku
        if (this.state.action === 'insert') {
            temp.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            });
        } else if (this.state.action === "update") {
            let index = temp.indexOf(this.state.selectedItem);
            temp[index].isbn = this.state.isbn;
            temp[index].judul = this.state.judul;
            temp[index].penulis = this.state.penulis;
            temp[index].penerbit = this.state.penerbit;
            temp[index].cover = this.state.cover;
            temp[index].harga = this.state.harga;
        }

        this.setState({ buku: temp })
        this.show_modal.hide()
    }
    handleShow(){
        this.setState({modalShow:true})
    }
    handleClose(){
        this.setState({modalShow:false})
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        {this.state.buku.map((item, index) => (
                            <Card
                                judul={item.judul}
                                penulis={item.penulis}
                                penerbit={item.penerbit}
                                harga={item.harga}
                                cover={item.cover}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.add()}
                            />
                        ))}
                    </div>

                    <Link className="btn btn-success" onClick={()=>this.add()}>
                        Tambah Data
                    </Link>
                </div>

                <div className="modal fade" id="modal-member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h4 className="text-white">
                                    Form Member
                                </h4>
                            </div>

                            <div className="modal-body">
                            <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.judul}
                                    onChange={ ev => this.setState({judul: ev.target.value}) }
                                    required />
                                    
                                    Penulis Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penulis}
                                    onChange={ ev => this.setState({penulis: ev.target.value}) }
                                    required />
                                    
                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.penerbit}
                                    onChange={ ev => this.setState({penerbit: ev.target.value}) }
                                    required />
                                    
                                    Harga Buku
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Cover Buku
                                    <input type="url" className="form-control mb-2"
                                    value={this.state.cover}
                                    onChange={ ev => this.setState({cover: ev.target.value}) }
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Gallery;
