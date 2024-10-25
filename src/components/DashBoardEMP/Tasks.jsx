'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

export default function Tasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input placeholder="Add a new task" className="mr-2" />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
          <div className="space-y-2">
            {['Complete project proposal', 'Review team performance', 'Prepare for client meeting'].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="text-gray-700">{task}</span>
                <Button variant="ghost" size="sm">Mark Complete</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}