import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchingLogin, LoginError } from '../../store/reducers/Auth/auth'
import  { Form, Input, Button, message } from 'antd'
const Register = () => {
    const { token, loading } = useSelector(store => store.auth)

    const [dataForBackend, setDataForBackend] = useState({
        name: "",
        phone: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(token) {
            navigate("/", {replace: true})
        }
    },[])

    function register(e) {
        e.preventDefault()
        dispatch(fetchingLogin())
            axios
            .post("http://todo.paydali.uz/api/register", dataForBackend)
            .then(res => {
                message.success('Successful Registration!')
                navigate("/login", { replace: true })
            })
            .catch(err => {
                dispatch(LoginError())
                message.error('Registration Error')
            })
    }

return (
    <>
    <div className='auth-cont w-full h-screen flex justify-center items-center bg-gray-200'>

        <Form className='register w-[30%] mx-auto my-auto shadow-md rounded-md p-8 bg-white'>
            <h1 className='flex items-center justify-center mb-4 text-4xl text-slate-700'>Registration</h1>
            <Form.Item>
                <Input  value={dataForBackend.name} onChange={(e) => setDataForBackend({...dataForBackend, name: e.target.value})} type="text" placeholder='Write your name!'/>
            </Form.Item>
            <Form.Item>
                <Input value={dataForBackend.phone} onChange={(e) => setDataForBackend({...dataForBackend, phone: e.target.value})} type="text" placeholder='Write your phone!'/>
            </Form.Item>
            <Form.Item>
                <Input.Password value={dataForBackend.password} onChange={(e) => setDataForBackend({...dataForBackend, password: e.target.value})} type="password" placeholder='Create your password!'/>
            </Form.Item>
            <Form.Item>
                <Button disabled={loading} onClick={register} className='w-full bg-blue-500' type='primary'>Submit</Button>
            </Form.Item>
        </Form>
    </div>
    </>
)
}

export default Register