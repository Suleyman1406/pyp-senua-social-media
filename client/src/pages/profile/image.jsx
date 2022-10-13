import React, { useState } from 'react'
import style from "./profile.module.css";


const Image = ({ file }) => {
    const [preview, setpreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
        setpreview(reader.result)
    }

    return (
        <>
            <img src={preview} alt="" style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                objectFit: "cover",
                position: 'absolute',
                top: -310,
            }} />
        </>
    )
}

export default Image