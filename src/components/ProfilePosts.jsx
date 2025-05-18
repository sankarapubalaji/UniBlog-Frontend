import React from 'react'
import { IF } from '../url'

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="w-full h-[200px] mb-3">
          <img
            src={IF + p.photo}
            alt={p.title || 'Post image'}
            className="h-full w-full object-cover rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          <h1 className="text-xl font-bold mb-1 md:text-2xl md:mb-2 hover:text-teal-500 transition-colors">
            {p.title}
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@{p.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <p className="text-sm md:text-lg line-clamp-3">
            {p.desc.slice(0, 150) + (p.desc.length > 150 ? ' ...Read more' : '')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePosts