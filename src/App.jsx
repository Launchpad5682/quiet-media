import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import { Header } from "./common/Header/Header";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<>This is the test page</>} />
      </Routes>
    </div>
  );
}

export default App;
