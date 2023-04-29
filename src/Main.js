import React, { useState,useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import Gallery from "./pages/Gallery"
import Tambah_data from './pages/Tambah_data'
import Buku from './pages/Buku'
import Login from './pages/Login'
import Transaksi from "./pages/Transaksi";

function Main() {
    let load_storage = localStorage.getItem('cart')==null?[]:JSON.parse(localStorage.getItem('cart'))
    const [cartItems, setCartItems] = useState(load_storage);
    const onAdd = (buku) => {
        const exist = cartItems.find(x => x.isbn === buku.isbn)
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.isbn === buku.isbn ? { ...exist, qty: exist.qty + 1 } : x
                )
            )
        } else {
            setCartItems([...cartItems, { ...buku, qty: 1 }])
        }
    }
    const onRemove = (buku) => {
        const exist = cartItems.find(x => x.isbn === buku.isbn)
        if (exist.qty === 1) {
          setCartItems(cartItems.filter((x) => x.isbn !== buku.isbn))
    
        } else {
          setCartItems(
            cartItems.map((x) =>
              x.isbn === buku.isbn ? { ...exist, qty: exist.qty - 1 } : x
            )
          )
    
        }
      }
    const checkout = () => {
          setCartItems([])
    }
    const saveLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    useEffect(() => {
        saveLocalStorage(cartItems)
    }, [cartItems])
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/t_data" element={<Tambah_data />} />
                <Route path="/buku" element={<Buku />} />
                <Route path="/transaksi" element={<Transaksi onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} checkout={checkout} />} />
                <Route path="*" element={
                    <NotFound />
                }
                ></Route>
            </Routes>
        </Router>
    )
}
export default Main;
