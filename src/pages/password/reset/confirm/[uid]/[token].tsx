import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import Submit from '../../../../../components/button/Submit';
import InputForm from '../../../../../components/form/InputForm';
import Layout from '../../../../../components/layout/Layout';
import { reset_password_confirm } from '../../../../../hooks/auth';
import { IFormResetPassConfirm } from '../../../../../types/interface';

const token = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const router = useRouter()
    const { uid, token } = router.query
    const [formData, setFormData] = useState<IFormResetPassConfirm>({
        password: '',
        re_password: '',
    });
    const [accountReset, setAccountReset] = useState(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (uid !== undefined && token !== undefined)
            dispatch(reset_password_confirm(uid, token, formData.password, formData.re_password));
        setAccountReset(true)
    };
    if (accountReset && !loading)
        router.push('/auth/login');
    return (
        <Layout title='Activate | Auth' content='activar cuenta'>
            <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
                <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
                    <div className="text-center m-6">
                        <h1 className="text-3xl font-semibold text-gray-700">Cambiar Password</h1>
                        <p className="text-gray-500">Just enter your email address below and we'll send you a link to reset your password!</p>
                    </div>
                    <div className="m-6">
                        <form onSubmit={onSubmit} className="mb-4" >
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
                                placeholder="Re Password"
                            />
                            <div className='mt-3'>
                                <Submit loading={loading} text='Cambiar password' />
                            </div>
                            <p className="text-sm text-center text-gray-400">
                                Don&#x27;t have an account yet?
                                <a href="#!" className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">Sign up</a>.
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default token