"use client"
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@/components/Profile';

function myProfile() {
  const router=useRouter();
    const [posts,setPosts]=useState([]);
    const {data:session}=useSession();
    const [user,setUser]=useState("");

    const handleEdit=(posts)=>{
      router.push(`/update-prompt?id=${posts._id}`)
    }
    const handleDelete=async(posts)=>{
      const hasConfirmed=confirm("Are you sure, you want to delet this prompt?");
      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${posts._id.toString()}`,{
            method:'DELETE'
          })
          // const filteredPosts=posts.filter((p)=>(
          //   p._id!==posts._id
          // ))
          // setPosts(filteredPosts);
        }
        catch(error){
          console.log(error);
        }
        finally{
          router.push("/");
          alert("prompt deleted");
        }
      }
    }
    useEffect(()=>{
        const fetchPosts=async()=>{
          const res=await fetch(`/api/users/${session?.user.id}/posts`);
          const data=await res.json();
          setUser(session?.user.name);
          setPosts(data);
          
        }
        fetchPosts();
    },[])
  return (
    <Profile
    name="My"
    desc="Welcome"
    user={user}
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  
    />
  )
}

export default myProfile