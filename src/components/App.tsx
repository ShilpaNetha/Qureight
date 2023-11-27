import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import Upload from "./upload";
import Navbar from "./navbar";
import Footer from "./footer";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
