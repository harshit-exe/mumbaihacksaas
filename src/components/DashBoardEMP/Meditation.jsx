import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Meditation() {
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Update the timer every second if running
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleAudioChange = (event) => {
    setSelectedAudio(event.target.value);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.value);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <Card className="w-full mx-auto my-8">
      <CardHeader>
        <CardTitle>Meditation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.
        </p>
        
        {/* Image */}
        <div className="mt-4">
          <img 
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AYoga_Meditation_Pos-410px.png&psig=AOvVaw0aQwneRUEIhCkGqjtbA08m&ust=1729981977825000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiw_ZzLqokDFQAAAAAdAAAAABAJ" 
            alt="Meditation" 
            className="w-full h-auto rounded-lg"
          />
        </div>

        <h2 className="mt-4 text-lg font-semibold">Benefits of Meditation:</h2>
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          <li>Reduces stress and anxiety</li>
          <li>Enhances self-awareness</li>
          <li>Improves attention span</li>
          <li>Promotes emotional health</li>
          <li>May reduce age-related memory loss</li>
          <li>Generate kindness</li>
        </ul>

        <h2 className="mt-4 text-lg font-semibold">Getting Started:</h2>
        <p className="mt-2 text-gray-700">
          To start meditating, find a quiet space, sit comfortably, and focus on your breath. If your mind wanders, gently bring your focus back to your breath. Start with just a few minutes each day and gradually increase the duration as you become more comfortable with the practice.
        </p>
{/* Stopwatch */}
<div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 flex flex-col items-center">
  <h2 className="text-lg font-semibold text-gray-800">Stopwatch:</h2>
  <span className="text-5xl font-bold text-gray-900 mt-4">
    {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
  </span>
  
  <div className="flex space-x-2 mt-4">
    <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Start</button>
    <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">Stop</button>
    <button onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">Reset</button>
  </div>
</div>

        {/* Audio Selection */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Select Guided Meditation Audio:</h2>
          <select onChange={handleAudioChange} className="mt-2">
            <option value="">-- Select Audio --</option>
            <option value="https://example.com/meditation-audio1.mp3">Audio 1</option>
            <option value="https://example.com/meditation-audio2.mp3">Audio 2</option>
            <option value="https://example.com/meditation-audio3.mp3">Audio 3</option>
          </select>
          {selectedAudio && (
            <audio controls className="w-full mt-2">
              <source src={selectedAudio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        {/* Video Selection */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Select Meditation Video:</h2>
          <select onChange={handleVideoChange} className="mt-2">
            <option value="">-- Select Video --</option>
            <option value="https://www.youtube.com/embed/VIDEO_ID_1">Video 1</option>
            <option value="https://www.youtube.com/embed/VIDEO_ID_2">Video 2</option>
            <option value="https://www.youtube.com/embed/VIDEO_ID_3">Video 3</option>
          </select>
          {selectedVideo && (
            <iframe
              width="100%"
              height="315"
              src={selectedVideo}
              title="Meditation Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mt-2"
            ></iframe>
          )}
        </div>

       
      </CardContent>
    </Card>
  );
}