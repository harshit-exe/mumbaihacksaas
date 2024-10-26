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
          Meditation is a practice where an individual uses a technique – such
          as mindfulness, or focusing the mind on a particular object, thought,
          or activity – to train attention and awareness, and achieve a mentally
          clear and emotionally calm and stable state.
        </p>

       {/* Image */}
<div className="mt-4">
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAgVBMVEX///8AAAD8/Py7u7v6+vrExMTW1tbb29vw8PAsLCyRkZHn5+fz8/PMzMyTk5P39/dubm5kZGRcXFx4eHixsbE0NDSCgoKgoKDg4OC9vb1ISEipqakVFRVVVVU/Pz+Li4sNDQ0cHBwjIyNMTEwnJydpaWmampp0dHQ6OjoYGBgxMTE6oEsCAAAIE0lEQVR4nO2dW4OiOBCFBeSiiLbiBe/ibez+/z9wwenZ7mkCJKkkh7j7vew+zdQZQ1JVqar0ekYJveHsIz85p3yTzgOzf7d+wvHV+YvFfIK2SSHxm1PlsUabpYztiaGvYIg2TA39lC2vIEXbpoRprT7HWaGNUwDr8/siQZtHZt6oz9n00QYSmTTrc5w52kIiwzaBFxdtIonWH9Bx7PZpWr7AErsPw+Yt9MkBbSOF6NouMI/RVhKI2/XZfRT6PAI9tJUEVjwCbXbXjjwCbd5Gl/8L/C8sUZu90TuPQJszFx6PQB9tJYGAR6DNB33IoW+Xoa0kwCPwOkJbSYBH4ANtpDyTEY/APdpMefbOjUPgBW2mPAMOeQXT28XS1NqMT2BBhDZVDq5g6YmlG2nCq29h6RKdcH6EzhJtqSy8H6G17jZHVvQJ2k5peM75giPaTmkmBy6BFsdLv7gEWnz9wvUR2rtC+TLb75a6Mb9pup//xO7rsyxvOQtTm69eSvrNn+HZ4g3mk2aBG/sFNl8w3dDm0WnOHI7R5tGJGgVa62Z/o1Gg/Z9gr9d0TT9DG6eCpiu0V1ihvaxe3wBtmxrGtQJtLj/4Tp239gttmCrqvsKX+AJL6vKjLyNw+79Ay6nbRl9GYF1N5asIHD1qBNpc4vSd2pA3t7n84IvgvU6gc3iF/qzGWqCDpReDX7j1fUtPziHaQhrrXbO+gi3aRgIxT5GFM7U1s+3Ocx59xTK1M2oK9nzySm72nRcjrlrfL4Z2badRfRBfL9GeMzHg6OdhsbRioU68jZy8kmnna2Pj+0JeXsll3eWPMUxr2slFeAy7emPo8dfetXDrYNlFNmx3ygTIV93aU13BU4+HYYcK9EaEjbOeQ2e+xT5fPZMwnWkNlTzX2+lIGSlX+44cnagjneT6BHai66d11AGFDoxJiHjLluXA/4S8Rb2S4OtolPlnbN7RIVRWn9VVAzpfs9asD966xVezTGAH9ro/dAsE76Oxggi3BWwTOnd3kjxvUIEa/dA/XKECuQYBEIEK5CiqJwO9m7kYEAjdRvV62r+B+jIG9GFvSE0IhI6bMSEQWphvQiA0MWNCINSVMSFw+uoCoa0HJgRCQ14TAqHTSvSHg2CBHNM1yUC/wbpSV5VAd1FNF2d/AT0HcwMCoePiDeh7fVcN6Ww3t68qAhkucY5TsVeggbQoNqI3kBbFprbruq5eRiD/4DQCyCWqtQDhD8hNRvvtYAnyHBQorJcH6YuaCCacDVCgiXjX2eGKgVwT+pADPQwJxDWocT2XQQd30htxRZGtvkZcUWRIb8QVLc4JWC2QRAuWFLBbetZrEkrbJz6BbaOsbgkd5ZWweILVoqsjgkLtMn1WEQnXCxOCoJL3I0ap4SWj+qeMLowrqEMkYmgZRzlRIGsWImiXYWVFPXJtEMt7ADlrLFc06xFbQB3WeHVQzMtK+/Z61E401o0VKOZlLNELvc+AJRA0eIYh8E5PRDHzIJiKQ0a05HO+BtYkkJXJwqQOq9Ww5RNK1BCDmU1eQARWPbXyhSFqqwhzmuUOoW9U3Q1Kp5Ea5jO3qRMk8VRdomX/O9UZXbKClByhr9q7+3zFjHopemT9E0EEupXt7llVFp+pAqPqn3BCTLio/kM/31Wg/4Kso/QOEFhV8nx3gJpqWzJPGsR70hWBg2dyiHylFrFcpAFgG60I/F2xQ40mitDBZTjs5vVVv8GhXxwT5Ii+jCkZzgxAYMzIEG4DrtevW9hUQ0LIRG6mW61lMAkoph/p0cLijBnboWFMDpsrKnlvSiCs6NfU7QtsiJVLPvS4AD6t5Zoo2oZWpeua5/Qd7JTchucyFGEqZejWuLuaB8qAJyFoV3jqwjR1nQqNPW3XmDJYaWphej8auxhscQX17KXm5LWj4cS/oocd/UB1dfMAv3v+QEWk+0WLvOLMMp+kUVm5xuN9TkLTGhUqhLbU1RB541yZwEGHNtCC2Lsrr+D6GHZkknE453pzQYr9HP1GbzbWHfEOUh+zWvtRFgZLI20F5/09MJt06nur40z/SLzvDG6r7F932NWbQ3QDY9nCvzm/3T+rSeJE3wn4a2GknaeWzXheZjD0LNnAa3ljyBQf6XadhFms+Hc01ETAyck5nc6DwWAZqPkiM//NyJYpwV5B1m1iYoahNNeAuFb9lFg4oZ0NpS4/M9KoS0X2QwxBZ54wkvGV5iHaKkmZ32FLRGLLz/eEqaWpkHai7pEaI4gu0qzrO+dPBOswRiZmvyrlKFavp/vOSD1ideuRdT+gWA+ea9f+8kRo5IWRMSqKERKINlYGkZJZQ93VahFJo5qYf64ckRRqV0PbJgYiaRq0sTIIPe+DNlYGoXMebawEe6GshYkCNMWI3dKYqpJUh2BORkezv1aEy6FMPCOhEPG+H6uCpQ+Zq2Czl2MkVlIZQ0PTmsg81jLqSqzI9jpL+Zy9q+1pVnXsSNVsE33FE87p/HG4zG7ELqALtdZZy23nbj9PgjCOnmsrWObyfxJhef5B+WFxOvo/J4j5sv2USootJ9SxDd84DL2aiC0ZC/oVm7u6AqFIxTrdpHe/eT1ld4EkguK5Fh4hvH/f3JarMOIabBcly1nO8WcelFd3ZeIZmnyxmaUrP4wFZ/bFwXj2aPwHPYx1FJAky0Hrz3ja5efFZZqO534SZIS2fjdMtm8P1uO3+X6rrzYvChLfL0yP4zBIyv8tWK/X5X+SYtvP4pHimpU48L3tePk22+9n0/S49RKZmrx/ALcijIy8HcLRAAAAAElFTkSuQmCC"
    alt="Meditation"
    className="w-13 h-auto rounded-lg" // Adjusted width to half
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
          To start meditating, find a quiet space, sit comfortably, and focus on
          your breath. If your mind wanders, gently bring your focus back to
          your breath. Start with just a few minutes each day and gradually
          increase the duration as you become more comfortable with the
          practice.
        </p>
        {/* Stopwatch */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800">Stopwatch:</h2>
          <span className="text-5xl font-bold text-gray-900 mt-4">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </span>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleStart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Stop
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Audio Selection */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            Select Guided Meditation Audio:
          </h2>
          <select
            onChange={(e) => setSelectedAudio(e.target.value)}
            className="mt-2"
          >
            <option value="">-- Select Audio --</option>
            <option value="https://www.bensound.com/bensound-music/bensound-meditation.mp3">
              Audio 1
            </option>
            <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3">
              Audio 2
            </option>
            <option value="https://www.sample-videos.com/audio/mp3/wave.mp3">
              Audio 3
            </option>
          </select>
          {selectedAudio && (
            <audio controls className="w-full mt-2">
              <source src={selectedAudio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        {/* Video Selection */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Select Meditation Video:</h2>
          <select onChange={handleVideoChange} className="mt-2">
            <option value="">-- Select Video --</option>
            <option value="https://www.youtube.com/embed/ZToicYcHIOU?si=PqFl_8qASviS8ixC">
              Video 1
            </option>
            <option value="https://www.youtube.com/embed/syx3a1_LeFo?si=iM5TLfUNkUY0Fa_m">
              Video 2
            </option>
            <option value="https://www.youtube.com/embed/uumInvT4t9Y?si=noX4fEHYpZOn9SPS">
              Video 3
            </option>
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
