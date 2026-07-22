import "./App.css";

import Disclosure from "./components/Disclosure";
import Tabs from "./components/Tabs";
import Modal from "./components/Modal";

function App() {
  return (
    <main className="container">
      <h1>Accessibility Playground</h1>

      <Disclosure />

      <Tabs />

      <Modal />
    </main>
  );
}

export default App;