import axios from "axios"
import UpdateTodo from "./UpdateTodo"
import { useState } from "react"
import { useRef } from 'react'
import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card"

const Todo = (props) => {
    const task = props.task
    const setTodosData = props.setTodosData

    const [visible, setVisible] = useState(false);
    const title = useRef('')
    const tags = useRef('')

    const deleteTodo = async (id) => {
        const res = await axios.delete(`http://localhost:7500/api/todos/${id}`)
        setTodosData(res.data)
    }

    const updete = async () => {
        // debugger
        const arr = (tags.current.value).split(',')
        const objTodo = {
            id: props.task._id,
            title: title.current.value,
            tags: arr
        }
        const res = await axios.put(`http://localhost:7500/api/todos`, objTodo)
        props.setTodosData(res.data)

    }
    const Complated = async () => {
        // debugger
        const objTodo = {
            id: props.task._id,
            title: props.task.title,
            tags: props.task.tags,
            completed: true
        }
        const res = await axios.put(`http://localhost:7500/api/todos`, objTodo)
        props.setTodosData(res.data)
    }
    const unComplated = async () => {

        const objTodo = {
            id: props.task._id,
            title: props.task.title,
            tags: props.task.tags,
            completed: false
        }
        const res = await axios.put(`http://localhost:7500/api/todos`, objTodo)
        props.setTodosData(res.data)
    }





    const footer = (
        <>
            <Button onClick={() => deleteTodo(props.task._id)} label="מחק משימה" icon="pi pi-trash" severity="info" /><span> </span>

            {/* <div className="card flex justify-content-center"> */}
            <Button label="ערוך משימה" icon="pi pi-pencil" onClick={() => setVisible(true)} /> <span></span>
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
                            <InputText id="username" ref={title} label="title" className="bg-white-alpha-20 border-none p-3 text-primary-50" placeholder={props.task.title}></InputText>
                        </div><span></span>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                tags
                            </label>
                            <InputText id="password" ref={tags} label="tags" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" placeholder={props.task.tags} ></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="עדכן" onClick={(e) => { updete(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog><span></span>
            <span></span>  {props.task.completed ? <Button onClick={() => unComplated()} label="!המשימה הושלמה" icon="pi pi-check" severity="success" /> : <Button onClick={() => { Complated() }} style={{ color: "red", backgroundColor: "white" }} /*label="השלם משימה"*/ icon="pi pi-check" severity="success" />}

            {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );



    return (<>
        <br />
        <div className="card flex flex-wrap justify-content-center gap-3">

            <Card title={props.task.title} subTitle={props.task.tags} footer={footer} className="md:w-30.5rem">
                <p className="m-0">    </p>
            </Card>
        </div>

        <br />


        {/*  
        <span style={{ 'color': "blue" }}>
            <p>{props.task.title}</p>
            {props.task.tags}
        </span><br></br> */}

        {/* <div className="card flex flex-wrap justify-content-center gap-3"> */}



        {/* </div> */}
    </>

    )
}
export default Todo