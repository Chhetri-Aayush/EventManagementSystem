import Router from "./Router/router";
import { AuthProvider } from "./Store/AuthContext";
import { EventProvider } from "./Store/EventContext";

function App() {
  return (
    <>
      <AuthProvider>
        <EventProvider>
        <Router></Router></EventProvider>
      </AuthProvider>

    </>
  );
}

export default App;
