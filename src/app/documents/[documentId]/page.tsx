import React from 'react'
import Editor from './editor'

interface DocumentIdPageProps {
    params: Promise<{documentId: string}>
}

const DocumetnIdPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params
    // const awaitedParams = await params
    // const documentId = awaitedParams.documentId

  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
    <Editor />
    </div>
  )
}

export default DocumetnIdPage