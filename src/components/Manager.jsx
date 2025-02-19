import { useRef } from "react"
import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import Footer from "./Footer"
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const showtoast = (text) => {
        return toast(text)
    }

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }


    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        getPasswords()
    }, [])

    const ref = useRef()

    const passwordRef = useRef()

    const showPassword = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }

    const [form, setform] = useState({ website: '', username: '', password: '' })

    const savePassword = async () => {
        const formData = { ...form, id: uuidv4() }
        setpasswordArray([...passwordArray, formData])
        await fetch("http://localhost:3000/", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
        showtoast("Password Saved")
        setform({ website: '', username: '', password: '' })
    }

    const deletePassword = async (id) => {
        setpasswordArray(passwordArray.filter((item) => item.id !== id))
        showtoast("Password Deleted Successfully")
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
        getPasswords()
    }

    const editPassword = async (id) => {
        setform(passwordArray.filter((item) => item.id == id)[0])
        setpasswordArray(passwordArray.filter((item) => item.id !== id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        showtoast(`Copied ${text}`)
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
        </div>
            <Navbar />
            <div className="w-full mx-auto max-w-5xl py-4 px-4">
                <h1 className="text-4xl text-black font-bold"><span className="text-green-700">&lt;</span>Pass<span className="text-green-700">OP /&gt;</span></h1>
                <p className="text-green-900 text-lg">Your own Password Manager</p>
                <div className=" flex flex-col p-4 gap-8 items-center">
                    <input value={form.website} onChange={handleChange} className="rounded-full bg-white border border-green-500 w-full text-black p-4 py-1" type="text" name="website" id="website" placeholder="Enter Website Url" />
                    <div className="flex w-full justify-between gap-6">
                        <input value={form.username} onChange={handleChange} className="rounded-full bg-white border border-green-500 text-black w-full p-4 py-1" type="text" name="username" id="username" placeholder="Enter Username" />
                        <div className="flex relative w-2xs">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className="rounded-full bg-white border border-green-500 text-black p-4 w-full py-1" type="password" name="password" id="password" placeholder="Enter Password" />
                            <span className="absolute top-2 right-2 cursor-pointer" onClick={() => showPassword()}><img ref={ref} width={20} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center items-center bg-green-400 gap-2 hover:bg-green-300 rounded-full w-fit px-6 py-1 border-1 border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h1 className="font-bold text-2xl py-4">Your Saved Passwords</h1>
                    {passwordArray.length === 0 && <div>No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className=" bg-green-800 text-white">
                            <tr>
                                <th className="py-2">Website</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="py-1"><div className="flex justify-center items-center gap-10">
                                        <a href={item.website}>{item.website}</a><lord-icon className={"cursor-pointer w-6"}
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            onClick={() => copyText(item.website)}
                                            trigger="hover">
                                        </lord-icon></div></td>
                                    <td className="py-1"><div className="flex justify-center items-center gap-10">
                                        <span>{item.username}</span><lord-icon className={"cursor-pointer w-6"}
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            onClick={() => copyText(item.username)}
                                            trigger="hover">
                                        </lord-icon></div></td>
                                    <td className="py-1 "><div className="flex justify-center items-center gap-10">
                                        <span>{"*".repeat(item.password.length)}</span><div onClick={() => copyText(item.password)}>
                                            <lord-icon className={"cursor-pointer w-6"}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon></div></div></td>
                                    <td className="py-1 "><div className="flex justify-center items-center gap-4">
                                        <lord-icon
                                            onClick={() => editPassword(item.id)}
                                            className={'w-6 cursor-pointer'}
                                            src="https://cdn.lordicon.com/xaubpxfc.json"
                                            trigger="hover">
                                        </lord-icon><lord-icon
                                            onClick={() => deletePassword(item.id)}
                                            className={'w-6 cursor-pointer'}
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover">
                                        </lord-icon></div></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>

    )
}

export default Manager
