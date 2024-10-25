'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

export default function TodoList() {
  const todos = [
    { id: 1, text: 'Review project timeline', completed: false },
    { id: 2, text: 'Prepare presentation slides', completed: true },
    { id: 3, text: 'Schedule team meeting', completed: false },
    { id: 4, text: 'Update client on progress', completed: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">To-Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center space-x-2">
                <Checkbox id={`todo-${todo.id}`} checked={todo.completed} />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                >
                  {todo.text}
                </label>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}