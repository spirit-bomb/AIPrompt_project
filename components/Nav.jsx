"use client"
import Link from 'next/link';
import Image from 'next/image';
import {useState,useEffect} from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';

function Nav() {
  const {data:session}=useSession();
  const [providers,setProviders]=useState(null);
  const [toggleDropDown,setToggleDropDown]=useState(false);
  useEffect(()=>{
    const setUpProvider=async()=>{
      const res=await getProviders();
      setProviders(res);
    }
    setUpProvider();
  },[])

  return (
  
    <nav className=' w-full mb-10 pt-3 flex-between sm:mb-10'>
        <Link href="/" className='gap-2 flex'>
            <Image src="/assets/images/logo.svg" alt="logo"
            width={30} height={30} className="object-contain" />
            <p className='max-sm:hidden font-bold' >
                PromptAI
            </p>
        </Link>
      
        {/* desktop nav */}
        
        <div className="sm:flex hidden">
            {session?.user?(
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt"
                className="border-2 border-black px-3.5 py-1.5 bg-black text-white rounded-full
                flex justify-center hover:bg-white hover:text-black transition-all font-medium">
                  Create Post
                </Link>
                <button type="button" onClick={signOut}
                className="border-2 border-black font-medium px-5 py-1.5 rounded-full
                hover:bg-black hover:text-white">
                  SignOut
                </button>
                <Link href="/profile">
                  <Image src={session?.user.image}
                  width={36} height={36} alt="prfile"
                  className="rounded-full" />
                </Link>
              </div>

            ):(
              <>
                {providers && 
                  Object.values(providers).map((provider)=>(
                  <button type="button"
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className="border-2 rounded-full bg-black text-white border-black
                  px-5 py-1.5 flex justify-center hover:bg-white hover:text-black">
                    Sign In
                  </button>
                ))}
              </>
            )
            }
        </div>

        {/* mobile nav */}
        <div className="sm:hidden flex ">
          {session?.user?(
            <div className="flex">
              <Image src={session?.user.image}
              width={36} height={36} alt="prfile"
              className="rounded-full" onClick={()=>setToggleDropDown((prev)=>!prev)} />
              {toggleDropDown && (
                <div className="flex flex-col absolute right-0 top-10 border-white
                justify-end mt-3 p-2  items-end mr-8 gap-1.5 bg-white">
                  <Link href="/profile" className="text-sm text-gray-500
                  hover:text-black font-medium"
                  onClick={()=>setToggleDropDown(false)}>
                    My Profile
                  </Link>

                  <Link href="/create-prompt" className="text-sm text-gray-500
                  hover:text-black font-medium"
                  onClick={()=>setToggleDropDown(false)}>
                    Create Prompt
                  </Link>

                  <button type="button" onClick={()=>{
                    setToggleDropDown(false);
                    signOut();
                  }} className="border-2 border-black px-8 py-1 text-sm bg-black text-white rounded-full
                  flex justify-center hover:bg-white hover:text-black transition-all font-medium mt-3">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ):(
            <>
            {providers && 
              Object.values(providers).map((provider)=>(
              <button type="button"
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className="border-2 border-black font-medium bg-black text-white px-5 py-1.5 rounded-full
                hover:bg-white hover:text-black">
                Sign In
              </button>
            ))}
            </>
          )}
        </div>
    </nav>
  )
}

export default Nav