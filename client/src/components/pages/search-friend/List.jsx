import { React } from 'react'
import { Avatar } from "@mui/material";

function List(props) {

    return (
        <ul>
            <header>
                <Avatar
                    alt="Remy Sharp"
                    src="https://code.edu.az/wp-content/uploads/2021/09/mezunlarimiz.jpeg"
                    sx={{ width: 60, height: 60 }}
                />
                <div>
                    <h4>
                        username
                    </h4>
                    <p>name</p>
                </div>
            </header>

            <footer></footer>
        </ul>
    )
}

export default List