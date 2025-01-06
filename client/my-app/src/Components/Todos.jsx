import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Todo from './Todo'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog';
import { PrimeIcons } from 'primereact/api';
import React from 'react'; 



const Todos = () => {
    const [visible, setVisible] = useState(false);
    const [todosData, setTodosData] = useState([])
    const title = useRef('')
    const tags = useRef('')

    const getTodos = async () => {
        // const word=useRef("")
        try {
            const res = await axios.get('http://localhost:7500/api/todos')
            if (res.status === 200) {
                console.log(res.data)
                setTodosData(res.data)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const createToDo = async () => {
        const arr= (tags.current.value).split(',')
        const newTodo = {
            title: title.current.value,
            tags: arr
        }
        const res = await axios.post('http://localhost:7500/api/todos', newTodo)
        setTodosData(res.data)
    }

    useEffect(() => {
        getTodos()
    }, [])


    return (
        <>
            {
                todosData.sort((a,b)=>a.title.localeCompare(b.title)).map(task => (
                    <div>
                        <Todo task={task} setTodosData={setTodosData}/>
                    </div>
                ))
            }


<div className="card flex justify-content-center">
{/* <div className="card flex justify-content-left"> */}
            <Button label="הוספת משימה"  icon="pi pi-plus" onClick={() => setVisible(true)} />
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
                            tags
                            </label>
                            <InputText id="password" ref={tags} label="tags" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => {createToDo(); hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>

        </>
    )
}
export default Todos