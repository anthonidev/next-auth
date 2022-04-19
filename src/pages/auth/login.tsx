import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../app/store';
import { IFormLogin } from '../../types/interface';
import { login } from '../../hooks/auth';
import InputForm from '../../components/form/InputForm';
import Submit from '../../components/button/Submit';
import Link from 'next/link';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const loading = useSelector((state: RootState) => state.auth.loading);

    const [formData, setFormData] = useState<IFormLogin>({
        email: 'tonirodriguez110@gmail.com',
        password: '123',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(formData.email, formData.password));
    };
    if (typeof window !== 'undefined' && isAuthenticated)
        router.push('/');

    return (
        <Layout title='Ingresar | ATON' content="Iniciar sesion en aton">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-day-100">
                <div className="max-w-md w-full space-y-8">
                    <div>

                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicia sesión con tu cuenta</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            O{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                crea una cuenta gratuitamente.
                            </a>
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">

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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/auth/reset">
                                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Submit loading={loading} text='Ingresar' />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login