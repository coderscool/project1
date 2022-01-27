import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import productApi from "../api/picturApi"

function User(props) {
    
    const [name, setName] = useState('')
    //console.log('name', names)
    const {picturId} =useParams()
    const isAddMode = picturId
    console.log('params', isAddMode)
    const [pictur, setPictur] = useState()

    useEffect(() => {
        if (!picturId) return;

        (async () => {
            try {
                const data = await productApi.getById(picturId);
                setPictur(data)
            } catch (error) {
                console.log('failed', error)
            }
        })()
    }, [picturId])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newPictur = {
                ...pictur,
                name
            }
            if (isAddMode) {
                await productApi.update(newPictur);
            } else {
                await productApi.add(newPictur)
            }
        } catch (error) {
            console.log(error)
        }
        setName('')
    }
    return(
        <div>
            <div>User</div>
        <div>
            <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder="product"/>
            <button onClick={handleSubmit}>Add</button>
        </div>
        </div>
    )
}

export default User