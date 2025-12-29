import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LeafletMap from "./components/LeafletMap";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LeafletMap />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
