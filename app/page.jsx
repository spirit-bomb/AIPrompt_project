import Feed from '@/components/Feed';

function Home() {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='text-5xl font-bold p-10 text-center md:text-6xl'>
            Discover & Share
            <br/>
            <span className='text-center bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent'>
                AI-Powered prompts
            </span>
        </h1>
        <p className='text-center'>
            AIPrompt is an open source AI prompting tool
            for modern world to discover, create and share 
            creative prompts
        </p>

        {/* Feed */}
        <Feed/>
    </section>
  )
}

export default Home