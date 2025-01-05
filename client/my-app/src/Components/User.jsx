import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

const User = (props) => {

    const setUsersData = props.setUsersData

    const [visible, setVisible] = useState(false);
    const [moredetelse, setMoredetelse] = useState(false);
    const name = useRef('')
    const username = useRef('')
    const email = useRef('')
    const address = useRef('')
    const phone = useRef('')

    const deleteUser = async (id) => {
        const res = await axios.delete(`http://localhost:7500/api/users/${id}`)
        setUsersData(res.data)
    }

    const updete = async () => {
        const objTodo = {
            _id: props.user._id,
            name: name.current.value,
            username: username.current.value,
            email: email.current.value,
            address: address.current.value,
            phone: phone.current.value
        }
        const res = await axios.put(`http://localhost:7500/api/users`, objTodo)
        props.setUsersData(res.data)
    }

    const moreDetelse = () => {
        setMoredetelse(true)

    }
    const lesDetelse = () => {
        setMoredetelse(false)
    }





    const footer = (
        <>
    <Button onClick={() => deleteUser(props.user._id)} label="מחק משתמש" icon="pi pi-trash" severity="info" /><span> </span>
                {moredetelse ? <Button onClick={() => lesDetelse()} label="הסתר" severity="help" />:<Button onClick={() => moreDetelse()} icon="pi pi-plus" label="פרטים נוספים" severity="success" /> }

                {/* <div className="card flex justify-content-center"> */}
                <span> </span><Button label="ערוך משתמש" icon="pi pi-user" onClick={() => setVisible(true)} /><span> </span>
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
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
                                <Button label="עדכן" onClick={(e) => { updete(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog>

     </>
    );


    return (
        <>
   <br />
   <div className="card flex flex-wrap justify-content-center gap-3">
   
        <Card title={`${props.user.name}":שם"`} /*subTitle={props.post.body}*/ footer={footer}  className="md:w-30.5rem">
            <p className="m-0">    </p>
            {moredetelse ? <span style={{ 'color': "blue" }}>
                {/* <p>{props.user.name} ":שם"</p> */}
                <p>{props.user.address} :כתובת</p>
                <p>{props.user.phone} :טלפון </p>
                <p>{props.user.email} :מייל</p>
            </span> : <span style={{ 'color': "blue" }}>
                {/* <p>{props.user.name} :שם</p> */}
                <p>{props.user.phone} :טלפון </p>
            </span>}
        </Card>
        </div>

        <br />
            {/* <span style={{ 'color': "blue" }}>
                <p>{props.user.name} :שם</p>
                <p>{props.user.phone} :טלפון </p>
            </span><br></br> */}

            {/* <div className="card flex flex-wrap justify-content-center gap-3"> */}
                {/* <i className="pi-trash" style={{ color: 'green' }}></i> */}
                {/* </div> */}
            {/* </div> */}

        </>
    )
}
export default User