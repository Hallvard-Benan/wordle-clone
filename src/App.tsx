import GameOverModal from "./components/GameOverModal";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  useKeyboardEvents();

  return (
    <Layout>
      <Header />
      <GameBoard />
      <Keyboard />
      <GameOverModal />
    </Layout>
  );
}

export default App;
