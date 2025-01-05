import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

const Post=(props)=>{
    const post=props.post
    const setPostsData=props.setPostsData
    
    const [visible, setVisible] = useState(false);
    const title = useRef('')
        const body = useRef('')
    
        const deletePost = async (id) => {
            const res = await axios.delete(`http://localhost:7500/api/posts/${id}`)
            setPostsData(res.data)
        }
    
        const updete = async () => {
            const objTodo = {
                id: props.post._id,
                title: title.current.value,
                body: body.current.value
            }
            const res = await axios.put(`http://localhost:7500/api/posts`, objTodo)
            props.setPostsData(res.data)
            
        }

        const footer = (
            <>
        <Button onClick={()=>deletePost(props.post._id)} label="מחק מאמר" icon="pi pi-trash"  severity="info" /><span> </span>

        {/* <div className="card flex justify-content-center"> */}
            <Button label="ערוך מאמר" icon="pi pi-file-edit" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                   
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                title
                            </label>
                            <InputText id="username" ref={title} label="title" className="bg-white-alpha-20 border-none p-3 text-primary-50" placeholder={props.post.title}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                body
                            </label>
                            <InputText id="password" ref={body} label="body" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" placeholder={props.post.body} ></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="עדכן" onClick={(e) => { updete(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>

         </>
        );

    return(
    <>
   <br />
   <div className="card flex flex-wrap justify-content-center gap-3">
   
        <Card title={props.post.title} subTitle={props.post.body} footer={footer}  className="md:w-30.5rem">
            <p className="m-0">    </p>
        </Card>
        </div>

        <br />
{/* 
<span style={{ 'color': "blue" }}>
            <p>{props.post.title}</p>
            {props.post.body}
        </span><br></br> */}

    </>
    )
}
export default Post