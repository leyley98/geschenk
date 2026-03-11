import { useState } from "react";
import BirthdayScreen from "./components/BirthdayScreen/BirthdayScreen";
import StartPage from "./components/StartPage/StartPage";
import EndScreen from "./components/EndScreen/EndScreen";
import Room1 from "./components/Room1/Room1";
import Room3 from "./components/Room3/Room3";
import Room4 from "./components/Room4/Room4";
import Room5 from "./components/Room5/Room5";
import Room6 from "./components/Room6/Room6";

const ROOM_ORDER = [5, 3, 1, 4, 6];
const TOTAL_ROOMS = ROOM_ORDER.length;

function App() {
  const [page, setPage] = useState("birthday");
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [completedRooms, setCompletedRooms] = useState(new Set());

  function handleStart(roomId) {
    setCurrentRoomId(roomId);
    setPage("room");
  }

  function handleComplete() {
    const updated = new Set([...completedRooms, currentRoomId]);
    setCompletedRooms(updated);
    setCurrentRoomId(null);
    setPage(updated.size >= TOTAL_ROOMS ? "end" : "start");
  }

  if (page === "birthday") return <BirthdayScreen onEnter={() => setPage("start")} />;
  if (page === "end") return <EndScreen />;

  if (page === "room") {
    if (currentRoomId === 5) return <Room5 onComplete={handleComplete} />;
    if (currentRoomId === 3) return <Room3 onComplete={handleComplete} />;
    if (currentRoomId === 1) return <Room1 onComplete={handleComplete} />;
    if (currentRoomId === 4) return <Room4 onComplete={handleComplete} />;
    if (currentRoomId === 6) return <Room6 onComplete={handleComplete} />;
  }

  return (
    <StartPage
      completedRooms={completedRooms}
      onStart={handleStart}
    />
  );
}

export default App;
