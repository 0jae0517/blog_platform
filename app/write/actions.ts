'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function publishPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const tagsStr = formData.get('tags') as string
  
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : []
  const category = tags.length > 0 ? tags[0] : 'Uncategorized'
  
  // Auto-generate some fields
  const excerpt = content.slice(0, 150) + (content.length > 150 ? '...' : '')
  const wordCount = content.split(/\s+/).length
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
  const readTime = `${readTimeMinutes} min read`
  const image_url = '/images/rust-code.png' // Default image for now

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('You must be logged in to publish a post')
  }

  const { data, error } = await supabase.from('posts').insert({
    title,
    content,
    excerpt,
    category,
    tags,
    image_url,
    read_time: readTime,
    author_id: user.id
  }).select().single()

  if (error) {
    console.error('Error inserting post:', error)
    throw new Error('Failed to publish post')
  }

  revalidatePath('/')
  redirect(`/posts/${data.id}`)
}
