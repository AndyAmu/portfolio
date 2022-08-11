import React from "react"
import '../index.css'
import './styles/project.css'


const Project = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className="header">
                <a style={{textDecoration:'none'}} href="https://github.com/AndresAmu/my-tinerary"><div className="card">
                    <div className="card-info1">
                    </div>
                    <p className="title">Ver Repositorio</p>
                </div>
                </a>
                <a style={{textDecoration:'none'}} href="https://github.com/AndresAmu/my-industrial-home">
                    
                <div className="card">
                    <div className="card-info2">
                    </div>
                    <p className="title">Ver Repositorio</p>
                </div>
                </a>
                <a style={{textDecoration:'none'}} href="https://github.com/AndresAmu/Amazing_Events">
                <div className="card">
                    <div className="card-info3">
                    
                    </div>
                    <p className="title">Ver Repositorio</p>
                </div>
                </a>
                <a style={{textDecoration:'none'}} href="https://github.com/AndresAmu/PETSHOP_MINDY_GRUPO_11">
                <div className="card">
                    <div className="card-info4">
                    </div>
                    <p className="title">Ver Repositorio</p>
                </div>
                </a>
            </div>

                
            
        </>


    )
}

export default Project