import { Menu, } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { logout } from '../../../hooks/auth';

export default function AuthDrop() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const logoutHandler = () => {
        dispatch(logout())
    }

 
    return (
        <Menu>
            <Menu.Button className="text-yellow-300 flex ">Mas<ChevronRightIcon className='h-6 w-6' /></Menu.Button>
            <Menu.Items>
                {
                    isAuthenticated ? (<Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active && 'bg-red-500 '} text-white mx-4 p-2`}
                                onClick={logoutHandler}
                            >
                                LogOut
                            </button>
                        )}
                    </Menu.Item>) : (<><Menu.Item>
                        {({ active }) => (
                            <Link href="/auth/login">
                                <a
                                    className={`${active && 'bg-blue-500'} text-white mx-4 p-2`}

                                >
                                    LogIn
                                </a>
                            </Link>
                        )}
                    </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/auth/signup">
                                    <a
                                        className={`${active && 'bg-blue-500'} text-white mx-4 p-2`}
                                    >
                                        SignUp
                                    </a>
                                </Link>
                            )}
                        </Menu.Item></>)
                }



            </Menu.Items>
        </Menu>
    )
}
