"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'


const UserProfile = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) return null;

  return (
    <motion.div 
      className="w-full overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-2xl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Profile header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="relative flex-shrink-0 overflow-hidden bg-gray-100 rounded-full w-14 h-14 dark:bg-gray-700">
          <Image
            src={user?.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
            alt={user?.name || "User avatar"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate dark:text-white">{user.name}</h3>
          <p className="text-xs text-gray-500 truncate dark:text-gray-400">@{user.username}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center text-gray-600 rounded-md w-9 h-9 hover:text-red-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
            aria-label="Delete user"
            onClick={() => {}}
          >
            {/* replace or keep icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-7 4h10" /></svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex gap-2 p-3 px-4 border-b border-gray-100 dark:border-gray-700">
        <button onClick={() => setActiveTab('profile')} className={`text-xs px-3 py-1 rounded ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}>Profile</button>
        <button onClick={() => setActiveTab('address')} className={`text-xs px-3 py-1 rounded ${activeTab === 'address' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}>Address</button>
        <button onClick={() => setActiveTab('company')} className={`text-xs px-3 py-1 rounded ${activeTab === 'company' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}>Company</button>
      </nav>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'profile' && (
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div>Email: <span className="text-gray-500 dark:text-gray-400">{user.email}</span></div>
            <div>Phone: <span className="text-gray-500 dark:text-gray-400">{user.phone}</span></div>
            <div>Website: <span className="text-gray-500 dark:text-gray-400">{user.website}</span></div>
          </div>
        )}

        {activeTab === 'address' && user.address && (
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div>{user.address.street}, {user.address.suite}</div>
            <div>{user.address.city}, {user.address.zipcode}</div>
          </div>
        )}

        {activeTab === 'company' && user.company && (
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div className="font-medium">{user.company.name}</div>
            <div className="text-xs italic">{user.company.catchPhrase}</div>
          </div>
        )}
      </div>

      {/* Expandable */}
      <div className="px-4 pb-4">
        <button onClick={() => setIsExpanded(v => !v)} className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          {isExpanded ? 'Hide details' : 'Show details'}
        </button>
        {isExpanded && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div>ID: {user.id}</div>
            <div>Username: {user.username}</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
// ...existing code...

export default UserProfile