import React from "react"
import "aframe"
import "aframe-layout-component"
import "aframe-environment-component"
import { Entity, Scene } from 'aframe-react'
import FrameAlt from "../Frame/deptIndex"
import Camera from "../Camera"
import "./exhibit.css"

function Exhibit(props) {
    const art = props.departments
    console.log(props)
    return (
        <div>
            <Scene>
                <Entity environment={`preset: ${props.environment}`} />
                <Camera />
                <Entity light={{ type: "ambient", color: "#BBB" }} />
                {/* <a-assets timeout="3000">
                    {art.map((asset, index)=>{
                        return(<img src={asset.image} id={`src${index}`} key={index} />)
                    })}
                </a-assets> */}
                <Entity layout="type: circle; plane: xz; radius: 5;" position="0 2 0">
                    {art.map((painting, index) => {
                        return (<FrameAlt image={`#src${index}`} id={painting.title} src={painting.image} />)
                    })}
                </Entity>
            </Scene>
            {art.map((asset, index) => {
                return ( <img src={asset.image} key={index} />)
            })}
        </div>
    )
}

export default Exhibit