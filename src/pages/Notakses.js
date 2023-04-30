import React from 'react'
import Navbar from '../Components/Navbar'

export default function Notakses(props) {
    const { role } = props
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="alert alert-success"></div>
                {"Anda bukan " + role}
            </div>
        </div>
    )
}
