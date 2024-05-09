import React from "react"
import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-6 text-white font-roboto">
            <img src={Logo} alt="VirtualVegas Logo" className="h-20 w-20"/>
            <Link to='login'><button className="bg-[#bda774] hover:bg-[#897952] text-white text-lg font-medium rounded p-2">Iniciar Sessão</button></Link>
        </div>
    )
}

export default Navbar