import React from 'react'
import { getInterviewers } from '@/actions/explore'
import PageHeader from '@/components/reusables';
import ExploreGrid from './_components/ExploreGrid';

const ExplorePage = async () => {

    const interviewers = await getInterviewers();

  return (
    <main className='min-h-screen bg-black'>
      <PageHeader
        label="Explore"
        gray="Find the"
        gold="Perfect Interviewer"
        description="Discover and connect with top interviewers to enhance your interview experience."
      />

      <div className='max-w-6xl mx-auto px-8 xl:px-0 py-10'>
        <ExploreGrid interviewers={interviewers} />
      </div>
    </main>
  )
}

export default ExplorePage
