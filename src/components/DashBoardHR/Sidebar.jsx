'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, LayoutDashboard, Briefcase, Activity, Database, BarChart, User, Settings, LogOut, X } from 'lucide-react'

const menuItems = [
  { name: 'Employee Overview', icon: Users, component: 'EmployeeOverview' },
  { name: 'Task Dashboard', icon: LayoutDashboard, component: 'TaskDashboard' },
  { name: 'Skill-Based Assignment', icon: Briefcase, component: 'SkillBasedAssignment' },
  { name: 'Real-time Tracking', icon: Activity, component: 'RealTimeTracking' },
  { name: 'Employee Database', icon: Database, component: 'EmployeeDatabase' },
  { name: 'Performance Analytics', icon: BarChart, component: 'PerformanceAnalytics' },
]

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export default function Sidebar({ onSelectComponent, closeSidebar }) {
  const [status, setStatus] = useState(true)

  return (
    <motion.div 
      className="flex flex-col h-full bg-card text-card-foreground"
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-primary">Jane Smith</h2>
              <p className="text-sm text-muted-foreground">HR Manager</p>
            </div>
          </motion.div>
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start mb-2 text-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => {
                  onSelectComponent(item.component)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>
      <motion.div 
        className="mt-auto p-4 flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div 
          className="flex items-center justify-between bg-muted rounded-lg p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Status:</span>
          <Switch
            checked={status}
            onCheckedChange={setStatus}
            className="data-[state=checked]:bg-primary"
          />
          <span className="text-sm font-medium">{status ? 'Online' : 'Offline'}</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}