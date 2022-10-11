import { React } from 'react'
import data from "./ListData.json"
import SingleFriend from './SingleFriend';

function List(props) {
    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <SingleFriend/>
            ))}
        </ul>
    )
}

export default List