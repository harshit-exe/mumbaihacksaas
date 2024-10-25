'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { CalendarDays, Clock, Zap, ArrowRight, TrendingUp, Users, Briefcase, Calendar } from 'lucide-react'

const taskData = [
  { name: 'Mon', tasks: 12, completed: 10 },
  { name: 'Tue', tasks: 15, completed: 13 },
  { name: 'Wed', tasks: 18, completed: 15 },
  { name: 'Thu', tasks: 14, completed: 12 },
  { name: 'Fri', tasks: 16, completed: 14 },
]

const projectData = [
  { name: 'Project A', value: 400 },
  { name: 'Project B', value: 300 },
  { name: 'Project C', value: 200 },
  { name: 'Project D', value: 100 },
]

const productivityData = [
  { name: 'Week 1', productivity: 65 },
  { name: 'Week 2', productivity: 75 },
  { name: 'Week 3', productivity: 80 },
  { name: 'Week 4', productivity: 85 },
]

const COLORS = ['#4DB6AC', '#81C784', '#AED581', '#DCE775']

const quickLinks = [
  { name: 'Start New Task', icon: Zap, href: '#' },
  { name: 'Schedule Meeting', icon: CalendarDays, href: '#' },
  { name: 'View Reports', icon: Clock, href: '#' },
]

const upcomingEvents = [
  { name: 'Team Meeting', time: '10:00 AM', date: 'Today' },
  { name: 'Project Deadline', time: '5:00 PM', date: 'Tomorrow' },
  { name: 'Client Call', time: '2:00 PM', date: 'Jun 15' },
]

const MotionCard = motion(Card)

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity:  1, y: 0, transition: { duration: 0.5 } },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('daily')

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <MotionCard variants={cardVariants} className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Task Overview</CardTitle>
          <CardDescription>Your task completion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasks" fill="var(--primary)" name="Total Tasks" />
                    <Bar dataKey="completed" fill="var(--secondary)" name="Completed Tasks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="productivity" stroke="var(--primary)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="var(--primary)"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.time} - {event.date}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Overall Progress</CardTitle>
          <CardDescription>Your progress across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm font-medium text-primary">{(project.value / 10).toFixed(0)}%</span>
                </div>
                <Progress value={project.value / 10} className="h-2" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants} className="col-span-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Button variant="outline" className="w-full justify-start h-auto py-4 px-6 group">
                  <link.icon className="mr-2 h-5 w-5 text-primary group-hover:text-primary-foreground" />
                  <span className="group-hover:text-primary-foreground">{link.name}</span>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>
      <MotionCard variants={cardVariants} className="col-span-full md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Key Metrics</CardTitle>
          <CardDescription>Important numbers at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TrendingUp className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productivity</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Users className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Briefcase className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Clock className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Task Time</p>
                <p className="text-2xl font-bold">2.5h</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
  )
}