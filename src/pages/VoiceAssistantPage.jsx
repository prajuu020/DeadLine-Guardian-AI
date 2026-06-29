import { useState } from "react";
import Navbar from "../components/Navbar";

function VoiceAssistantPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;

      setTranscript(voiceText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice recognition failed.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-4">
          🎤 Voice Assistant
        </h1>

        <p className="text-gray-400 mb-8">
          Speak naturally and let your productivity assistant understand you.
        </p>

        <div className="bg-slate-900 p-10 rounded-2xl text-center">

          <button
            onClick={startListening}
            className={`px-8 py-4 rounded-xl text-xl font-bold ${
              listening
                ? "bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {listening
              ? "🎙️ Listening..."
              : "Start Voice Command"}
          </button>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Recognized Command
            </h2>

            <div className="bg-slate-800 p-6 rounded-xl min-h-[120px]">
              {transcript ? (
                <p className="text-xl">{transcript}</p>
              ) : (
                <p className="text-gray-400">
                  Try saying:
                  <br />
                  "Complete my resume tomorrow"
                  <br />
                  "Study DSP today"
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default VoiceAssistantPage;