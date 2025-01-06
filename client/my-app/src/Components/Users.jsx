import axios from "axios";
import { useEffect, useRef, useState } from "react";
import User from './User'
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Users=(props)=>{
    const [usersData, setUsersData] = useState([])
    const [visible, setVisible] = useState(false);
    const name = useRef('')
    const username = useRef('')
    const email = useRef('')
    const address = useRef('')
    const phone = useRef('')

    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:7500/api/users')
            if (res.status === 200) {
                console.log(res.data)
                setUsersData(res.data)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const createUser = async () => {
        const newUser = {
            name: name.current.value,
            username: username.current.value,
            email: email.current.value,
            address: address.current.value,
            phone: phone.current.value
        }
        const res = await axios.post('http://localhost:7500/api/users', newUser)
        setUsersData(res.data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return(
    <>
 {
                usersData.sort((a,b)=>a.name.localeCompare(b.name)).map(user => (
                    <div>
                        <User user={user} setUsersData={setUsersData}/>
                    </div>
                ))
            }

<div className="card flex justify-content-center">
            <Button label="הוספת משתמש"  icon="pi pi-user-plus" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            name
                            </label>
                            <InputText id="username" ref={name} label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            username
                            </label>
                            <InputText id="password" ref={username} label="username" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            email
                            </label>
                            <InputText id="password" ref={email} label="email" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            address
                            </label>
                            <InputText id="password" ref={address} label="address" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            phone
                            </label>
                            <InputText id="password" ref={phone} label="phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הוסף" onClick={(e) => {createUser(); hide(e)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>


    </>
    )
}
export default Users