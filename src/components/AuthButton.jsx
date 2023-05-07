import {useSession,signOut,signIn} from 'next-auth/react';

export default function AuthButton(){
    const {data:session} = useSession();
    const handleAuth =()=>{
        if(session){
            signOut();
        }else{
            signIn();
        }
    }
    return (
        <button onClick={handleAuth} className='py-2 px-5 bg-sky-400 text-white rounded-xl hover:bg-blue-300 lg:hidden'>{!session? 'Sign In':'Sign-out'}</button>
    )
}