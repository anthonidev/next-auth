import Head from "next/head"
import { Props } from '../../types/types';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { check_authenticated, load_user, refresh } from "../../features/authSlice";


const Layout: React.FC<Props> = ({ title, content, children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(check_authenticated());
    dispatch(load_user());
    dispatch(refresh());

  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Head>

      <main>{children}</main>
    </>
  )
}


Layout.defaultProps = {
  title: 'Surf',
  content: 'Surf'
}
export default Layout