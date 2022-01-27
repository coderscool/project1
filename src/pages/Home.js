import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { selectPictur } from "../features/pictur/picturSlice"

function Home(props) {
    const {pagination, onPageChange, onDeleteChange} = props
    const picturs = useSelector(selectPictur);
    console.log(picturs);
    const {_page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);
    const history = useHistory();
    // const {picturId} =useParams()
    // console.log('params', picturId)

    const handlePageChange = (newPages) => {
        if (onPageChange) {
            onPageChange(newPages)
        }
    }

    const handleUpdate = async (pictur) => {
        console.log('picturids', pictur.id)
        history.push(`/user/${pictur.id}`)
    }

    const handleDelete = async (pictur) => {
        if (onDeleteChange) {
            onDeleteChange(pictur)
        }
    }
    return(
       <div>
            <div>Home</div>
        <div>
            {picturs.map((pictur, index) => (
               <div className="post">
                    <li key={index}>{pictur.name}</li>
                    <button onClick={() => handleDelete(pictur)} key={null} className="delete">x</button>
                    <button onClick={() => handleUpdate(pictur)}>Edit</button>
               </div>
            ))}
        </div>
        <div>
            <button disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>prev</button>

            <button disabled={_page >= totalPages} onClick={() => handlePageChange(_page + 1)}>Next</button>
        </div>
       </div>
    )
}

export default Home