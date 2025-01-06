import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import Post from './Post'
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Dialog } from "primereact/dialog"

const Posts=()=>{
    const [postsData, setPostsData] = useState([])
    const [visible, setVisible] = useState(false);
    const title = useRef('')
    const body = useRef('')

    const getPosts = async () => {
        try {
            const res = await axios.get('http://localhost:7500/api/posts')
            if (res.status === 200) {
                console.log(res.data)
                setPostsData(res.data)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const createPost = async () => {
        const newPost = {
            title: title.current.value,
            body: body.current.value
        }
        const res = await axios.post('http://localhost:7500/api/posts', newPost)
        setPostsData(res.data)
    }

    useEffect(() => {
        getPosts()
    }, [])


    return(
    <>
   {
                postsData.sort((a,b)=>a.title.localeCompare(b.title)).map(post => (
                    <div>
                        <Post post={post} setPostsData={setPostsData}/>
                    </div>
                ))
            }

<div className="card flex justify-content-center">
            <Button label="הוספת מאמר"  icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            title
                            </label>
                            <InputText id="username" ref={title} label="title" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            body
                            </label>
                            <InputText id="password" ref={body} label="body" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => {createPost(); hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>

    </>
    )
}
export default Posts