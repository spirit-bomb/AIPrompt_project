import PromptCard from '@/components/promptCard';
import {useSession} from 'next-auth/react';
function Profile({name,desc,handleEdit,handleDelete,data,user}) {

  return (
    <div className=" w-full">
        <div className='text-5xl sm:text-6xl font-extrabold'>
            <span className='bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400
            bg-clip-text text-transparent'>
                {name} Profile
            </span>
        </div>
        <p className='mt-4 text-gray-600'>
            {desc} <span className="font-medium text-lg text-black">
                        {user}
                    </span>
        </p>
        <div className='mt-16 sm:columns-2 xl:columns-3 space-y-6'>
            {data.map((post)=>(
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={()=>handleEdit && handleEdit(post)}
                    handleDelete={()=>handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </div>
  )
}

export default Profile