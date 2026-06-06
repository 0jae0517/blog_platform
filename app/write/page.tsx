'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, FileText } from 'lucide-react'
import Link from 'next/link'
import { publishPost } from './actions'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  return (
    <div className="min-h-screen bg-[#111113] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#111113]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="w-px h-6 bg-gray-800"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Draft in progress</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-700 rounded-md hover:bg-gray-800 hover:text-white transition-all">
            Save Draft
          </button>
          <form action={publishPost}>
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="tags" value={tags.join(',')} />
            <button 
              type="submit" 
              disabled={!title.trim() || !content.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              Publish
            </button>
          </form>
        </div>
      </header>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-6 py-10 gap-8">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl md:text-5xl font-bold text-white placeholder-gray-600 focus:outline-none tracking-tight"
        />

        {/* Tags Section */}
        <div className="flex flex-wrap items-center gap-3">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="flex items-center px-3 py-1.5 text-sm bg-[#1A1D24] text-gray-300 rounded-md border border-gray-800 cursor-pointer hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors group"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </span>
          ))}
          <div className="flex items-center px-3 py-1.5 text-sm bg-transparent text-gray-500 border border-dashed border-gray-700 rounded-md focus-within:border-gray-500 focus-within:text-gray-300 transition-colors">
            <Plus className="w-3.5 h-3.5 mr-1" />
            <input
              type="text"
              placeholder="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-transparent focus:outline-none w-24 placeholder-gray-600"
            />
          </div>
        </div>

        {/* Markdown Editor */}
        <textarea
          placeholder="Write your markdown content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full bg-transparent text-gray-300 font-mono text-[15px] leading-relaxed resize-none focus:outline-none min-h-[500px]"
          spellCheck={false}
        />
      </main>
    </div>
  )
}
