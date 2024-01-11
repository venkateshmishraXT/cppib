import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { SocketProvider } from "./providers/socket-provider";
import { ConversationProvider } from "./providers/conversation-provider";
import { StreamProvider } from "./providers/stream-provider";
import RecordingManager from "./components/RecordingManager";

function App() {
  return (
    <SocketProvider>
      <StreamProvider>
        <ConversationProvider>
          <RecordingManager />
          <Dashboard />
        </ConversationProvider>
      </StreamProvider>
    </SocketProvider>
  );
}

export default App;
