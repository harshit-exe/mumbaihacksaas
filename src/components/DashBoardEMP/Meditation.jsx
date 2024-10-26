"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { PlayCircle, PauseCircle, RotateCcw, Volume2, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const MeditationApp = () => {
  const [selectedAudio, setSelectedAudio] = useState("")
  const [selectedVideo, setSelectedVideo] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes default
  const [volume, setVolume] = useState(50)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    let interval = null
    if (isRunning && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    } else if (seconds >= duration) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds, duration])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const progressPercentage = (seconds / duration) * 100

  return (
    <div className={`min-h-screen p-4 sm:p-8`}>
      <Card className="w-full max-w-4xl mx-auto my-8 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/30 dark:bg-gray-800/30">
        <CardHeader className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme === "light" ? "from-purple-600 to-pink-600" : "from-purple-400 to-pink-400"}`}>Meditation Oasis</CardTitle>
            <CardDescription className={`text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Find your inner peace and tranquility
            </CardDescription>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-video rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src="/placeholder.svg?height=400&width=800" 
              alt="Serene meditation scene" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="timer" className={`text-xl ${theme === "light" ? "data-[state=active]:bg-violet-200" : "data-[state=active]:bg-violet-800"}`}>Timer</TabsTrigger>
              <TabsTrigger value="media" className={`text-xl ${theme === "light" ? "data-[state=active]:bg-violet-200" : "data-[state=active]:bg-violet-800"}`}>Media</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="timer" className="space-y-6">
                <motion.div
                  key="timer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${theme === "light" ? "bg-gradient-to-br from-violet-100 to-indigo-100" : "bg-gradient-to-br from-violet-900 to-indigo-900"} overflow-hidden shadow-lg`}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative w-64 h-64">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200 stroke-current"
                              strokeWidth="5"
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                            ></circle>
                            <circle
                              className="text-indigo-500 progress-ring__circle stroke-current"
                              strokeWidth="5"
                              strokeLinecap="round"
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 * (1 - progressPercentage / 100)}
                              transform="rotate(-90 50 50)"
                            ></circle>
                            <text x="50" y="50" fontFamily="Verdana" fontSize="20" textAnchor="middle" alignmentBaseline="middle" fill={theme === "light" ? "#4F46E5" : "#818CF8"}>
                              {formatTime(seconds)}
                            </text>
                          </svg>
                        </div>
                        <div className="flex space-x-4">
                          <Button onClick={isRunning ? handleStop : handleStart} size="lg" className={`text-xl px-8 py-6 ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white transition-colors duration-300`}>
                            {isRunning ? <PauseCircle className="mr-2 h-6 w-6" /> : <PlayCircle className="mr-2 h-6 w-6" />}
                            {isRunning ? 'Pause' : 'Start'}
                          </Button>
                          <Button onClick={handleReset} variant="outline" size="lg" className="text-xl px-8 py-6">
                            <RotateCcw className="mr-2 h-6 w-6" />
                            Reset
                          </Button>
                        </div>
                        <Select onValueChange={(value) => setDuration(parseInt(value))}>
                          <SelectTrigger className="w-[250px] text-lg">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">5 minutes</SelectItem>
                            <SelectItem value="600">10 minutes</SelectItem>
                            <SelectItem value="900">15 minutes</SelectItem>
                            <SelectItem value="1200">20 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              <TabsContent value="media" className="space-y-6">
                <motion.div
                  key="media"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${theme === "light" ? "bg-gradient-to-br from-pink-100 to-purple-100" : "bg-gradient-to-br from-pink-900 to-purple-900"} overflow-hidden shadow-lg`}>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <label className={`text-xl font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>Select Guided Meditation Audio:</label>
                          <Select onValueChange={setSelectedAudio}>
                            <SelectTrigger className="w-full mt-2 text-lg">
                              <SelectValue placeholder="Select Audio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://example.com/meditation-audio1.mp3">Calm Ocean Waves</SelectItem>
                              <SelectItem value="https://example.com/meditation-audio2.mp3">Forest Ambience</SelectItem>
                              <SelectItem value="https://example.com/meditation-audio3.mp3">Zen Garden</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedAudio && (
                          <div className="space-y-4">
                            <audio controls className="w-full">
                              <source src={selectedAudio} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                            <div className="flex items-center space-x-2">
                              <Volume2 className="h-6 w-6" />
                              <Slider
                                value={[volume]}
                                onValueChange={(values) => setVolume(values[0])}
                                max={100}
                                step={1}
                                className="w-full"
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <label className={`text-xl font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>Select Meditation Video:</label>
                          <Select onValueChange={setSelectedVideo}>
                            <SelectTrigger className="w-full mt-2 text-lg">
                              <SelectValue placeholder="Select Video" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://www.youtube.com/embed/VIDEO_ID_1">Guided Meditation for Beginners</SelectItem>
                              <SelectItem value="https://www.youtube.com/embed/VIDEO_ID_2">Mindfulness Meditation</SelectItem>
                              <SelectItem value="https://www.youtube.com/embed/VIDEO_ID_3">Deep Relaxation Journey</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedVideo && (
                          <div className="aspect-video mt-4 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              width="100%"
                              height="100%"
                              src={selectedVideo}
                              title="Meditation Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className={`${theme === "light" ? "bg-gradient-to-br from-green-100 to-emerald-100" : "bg-gradient-to-br from-green-900 to-emerald-900"} overflow-hidden shadow-lg`}>
              <CardContent className="pt-6">
                <h2 className={`text-2xl font-semibold mb-4 ${theme === "light" ? "text-green-800" : "text-green-200"}`}>Benefits of Meditation:</h2>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  {[
                    "Reduces stress and anxiety",
                    "Enhances self-awareness",
                    "Improves attention span",
                    "Promotes emotional health",
                    "May reduce age-related memory loss",
                    "Generates kindness"
                  ].map((benefit, index) => (
                    <li key={index} className={`${theme === "light" ? "text-green-700" : "text-green-300"}`}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className={`${theme === "light" ? "bg-gradient-to-br from-blue-100 to-cyan-100" : "bg-gradient-to-br from-blue-900 to-cyan-900"} overflow-hidden shadow-lg`}>
              <CardContent className="pt-6">
                <h2 className={`text-2xl font-semibold mb-4 ${theme === "light" ? "text-blue-800" : "text-blue-200"}`}>Getting Started:</h2>
                <p className={`text-lg ${theme === "light" ? "text-blue-700" : "text-blue-300"}`}>
                  Find a quiet space, sit comfortably, and focus on your breath. If your mind wanders, gently bring your focus back  to your breath. Start with just a few minutes each day and gradually increase the duration as you become more comfortable with the practice.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MeditationApp