import React from 'react'
import { Plus } from 'lucide-react'
import NoteList from '~/components/NoteList'
import SortBy from '~/components/SortBy'
import TagFilter from '~/components/TagFilter'
import { Button } from '~/components/ui/button'

const mockNotes = [
  {
    id: 1,
    title: 'First Note',
    content: 'This is the content of the first note.',
    tags: ['personal', 'work'],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-02'
  },
  {
    id: 2,
    title: 'Grocery List',
    content: 'Buy milk, eggs, bread, and coffee.',
    tags: ['shopping'],
    createdAt: '2023-10-03',
    updatedAt: '2023-10-03'
  },
  {
    id: 3,
    title: 'Project Ideas',
    content: 'Note-taking app, Expense tracker, Pomodoro timer.',
    tags: ['ideas', 'project'],
    createdAt: '2023-10-04',
    updatedAt: '2023-10-05'
  },
  {
    id: 4,
    title: 'Meeting Notes',
    content: 'Discuss Q4 goals and assign team roles.',
    tags: ['work', 'meeting'],
    createdAt: '2023-10-06',
    updatedAt: '2023-10-06'
  },
  {
    id: 5,
    title: 'Workout Plan',
    content: 'Monday: Chest; Tuesday: Back; Wednesday: Legs.',
    tags: ['fitness'],
    createdAt: '2023-10-07',
    updatedAt: '2023-10-08'
  },
  {
    id: 6,
    title: 'Travel Wishlist',
    content: 'Japan, Italy, Iceland, New Zealand.',
    tags: ['travel', 'wishlist'],
    createdAt: '2023-10-09',
    updatedAt: '2023-10-09'
  },
  {
    id: 7,
    title: 'Book Recommendations',
    content: 'Atomic Habits, Deep Work, The Alchemist.',
    tags: ['books'],
    createdAt: '2023-10-10',
    updatedAt: '2023-10-10'
  },
  {
    id: 8,
    title: 'Learning Plan',
    content: 'Learn React, Next.js, MongoDB.',
    tags: ['learning', 'development'],
    createdAt: '2023-10-11',
    updatedAt: '2023-10-11'
  },
  {
    id: 9,
    title: 'Weekly Reflection',
    content: 'Felt productive and completed most tasks.',
    tags: ['journal', 'reflection'],
    createdAt: '2023-10-12',
    updatedAt: '2023-10-12'
  },
  {
    id: 10,
    title: 'Important Contacts',
    content: 'Doctor, Landlord, Internet Provider.',
    tags: ['contacts'],
    createdAt: '2023-10-13',
    updatedAt: '2023-10-13'
  },
  {
    id: 11,
    title: 'Coding Tips',
    content: 'Use meaningful names, avoid nested callbacks.',
    tags: ['coding', 'tips'],
    createdAt: '2023-10-14',
    updatedAt: '2023-10-15'
  },
  {
    id: 12,
    title: 'Birthday Gifts',
    content: 'Watch, perfume, book, headphones.',
    tags: ['personal'],
    createdAt: '2023-10-16',
    updatedAt: '2023-10-16'
  },
  {
    id: 13,
    title: 'Movie Watchlist',
    content: 'Inception, Interstellar, Parasite, Oppenheimer.',
    tags: ['movies'],
    createdAt: '2023-10-17',
    updatedAt: '2023-10-17'
  },
  {
    id: 14,
    title: 'UI Ideas',
    content: 'Dark mode toggle, drag-and-drop notes.',
    tags: ['ui', 'design'],
    createdAt: '2023-10-18',
    updatedAt: '2023-10-18'
  },
  {
    id: 15,
    title: 'Interview Prep',
    content: 'Review algorithms, system design, STAR method.',
    tags: ['career', 'prep'],
    createdAt: '2023-10-19',
    updatedAt: '2023-10-20'
  },
  {
    id: 16,
    title: 'Blog Topics',
    content: 'React patterns, Web performance, Accessibility.',
    tags: ['writing', 'blog'],
    createdAt: '2023-10-21',
    updatedAt: '2023-10-21'
  },
  {
    id: 17,
    title: 'Meditation Log',
    content: '10 min every morning, calm and focused.',
    tags: ['wellness'],
    createdAt: '2023-10-22',
    updatedAt: '2023-10-22'
  },
  {
    id: 18,
    title: 'Tech Stack',
    content: 'React, Express, MongoDB, Node.js.',
    tags: ['tech'],
    createdAt: '2023-10-23',
    updatedAt: '2023-10-23'
  },
  {
    id: 19,
    title: 'Daily Goals',
    content: 'Code for 2 hours, read 30 pages, exercise.',
    tags: ['productivity'],
    createdAt: '2023-10-24',
    updatedAt: '2023-10-24'
  },
  {
    id: 20,
    title: 'Ideas for KNotes',
    content: 'Add markdown support, color-coded tags, archive/trash.',
    tags: ['knote', 'features'],
    createdAt: '2023-10-25',
    updatedAt: '2023-10-26'
  }
]

const NotesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">My Notes</h3>
        <Button type="button">
          <Plus /> Add new note
        </Button>
      </div>
      <div className="flex items-start flex-wrap gap-4 justify-between">
        <TagFilter />
        <SortBy />
      </div>
      <NoteList data={mockNotes} />
    </div>
  )
}

export default NotesPage
