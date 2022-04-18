import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import { useRouter } from 'next/router';
import { IFormSignUp } from '../../types/interface';
import InputForm from '../../components/form/InputForm';
import { AppDispatch, RootState } from '../../app/store';
import Submit from '../../components/button/Submit';
import { signup } from '../../hooks/auth';

const Signup = () => {
    const loading = useSelector((state: RootState) => state.auth.loading);
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter();
    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState<IFormSignUp>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(signup(formData.first_name, formData.last_name, formData.email, formData.password, formData.re_password))
        setAccountCreated(true);
        window.scrollTo(0, 0)
    }
    if (accountCreated)
        router.push('/auth/login');

    return (
        <Layout title='Registrarse | Auth' content="registrar usuario">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <InputForm
                                name={'first_name'}
                                type='text'
                                onChange={onChange}
                                value={formData.first_name}
                                placeholder="First Name"
                            />
                            <InputForm
                                name={'last_name'}
                                type='text'
                                onChange={onChange}
                                value={formData.last_name}
                                placeholder="Last Name"
                            />
                            <InputForm
                                name={'email'}
                                type='text'
                                onChange={onChange}
                                value={formData.email}
                                placeholder="Email"
                            />
                            <InputForm
                                name={'password'}
                                type='password'
                                onChange={onChange}
                                value={formData.password}
                                placeholder="Password"
                            />
                            <InputForm
                                name={'re_password'}
                                type='password'
                                onChange={onChange}
                                value={formData.re_password}
                                placeholder="Password Confirm"
                            />
                            <Submit loading={loading} text="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signup