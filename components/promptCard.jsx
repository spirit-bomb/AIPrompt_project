"use client"
import {useState} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import Image from 'next/image';


function PromptCard({post,handletagClick,handleEdit,handleDelete}) {
  const {data:session}=useSession();
  const [copied,setCopied]=useState("");
  const pathName=usePathname();
  const router=useRouter();
  const copyText=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
  }
  
  return (
    <div className="h-fit border-2 flex w-full md:w-360px break-inside-avoid
    flex-col p-6 bg-white/20 rounded-lg backdrop-blur-lg">
        <div className="flex flex-row gap-4 justify-between">
            <div className="flex justify-start items-center gap-3">
                <Image src={post.creator[0].image}
                alt="user_image"
                width={40}
                height={40} 
                className="object-contain rounded-full"/>
            
            <div>
              <span className='text-black font-medium'>
                {post.creator[0].userName}
              </span > 
              <p className=" text-gray-700">
                {post.creator[0].email}
              </p>
            </div>
            </div>
            <div onClick={copyText}>
              <Image src={copied===post.prompt?'/assets/icons/tick.svg'
              :'/assets/icons/copy.svg'}
              width={14}
              height={14}
              alt="copy-button"
              className="cursor-pointer"/>
              
            </div>
        </div>
        <p className="mt-3">
          {post.prompt}
        </p>
        <p className="font-inter mt-2 bg-gradient-to-r from-blue-800 to-blue-300 bg-clip-text text-transparent
        cursor-pointer">
          #{post.tag}
        </p>
        {session?.user.id===post.creator[0]._id && 
        pathName==="/profile" && (
          <div className="flex flex-row justify-between  mt-3 m-auto w-20">
            <div onClick={handleEdit}
            className="text-sm cursor-pointer bg-gradient-to-r from-green-700 to-green-500
            bg-clip-text text-transparent font-medium hover:font-bold">
              Edit
            </div>
            <div onClick={handleDelete}
            className="text-sm cursor-pointer bg-gradient-to-r from-red-700 to-red-500
            bg-clip-text text-transparent font-medium hover:font-bold">
              Delete
            </div>
          </div>
        )}
    </div>
  )
}

export default PromptCard