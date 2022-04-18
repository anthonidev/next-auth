import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../app/store'
import Layout from '../../../components/layout/Layout';
import { activate } from '../../../hooks/auth';

const token = () => {
    const [activated, setActivated] = useState(false);
    const loading = useSelector((state: RootState) => state.auth.loading);


    const router = useRouter()
    const dispatch: AppDispatch = useDispatch()
    const { uid, token } = router.query

    const activate_account = () => {
        if (uid !== undefined && token !== undefined)
            dispatch(activate(uid, token));
        setActivated(true);
    }

    if (activated && !loading)
        router.push('/auth/login');

    return (
        <Layout title='Activate | Auth' content='activar cuenta'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    {loading ?
                        <button
                            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            xd
                        </button> :
                        <button
                            onClick={activate_account}
                            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Activate Account
                        </button>
                    }
                </div>
            </div>
        </Layout>

    )
}

export default token