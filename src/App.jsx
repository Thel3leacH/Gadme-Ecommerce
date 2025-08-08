import { Navbar } from "./components/Navbar";
import SplashCursor from "./components/SplashCursor";

const App = () => {
  return (
    <div className="min-w-screen bg-teal-500 flex justify-end gap-20 shadow-md">
      <Navbar />
      <h1 className="text-xl font-bold text-white hover:text-green-800 cursor-pointer">
        Hello test ✌😉
      </h1>
      <h1 className="text-xl font-bold text-white hover:text-green-800 cursor-pointer">
        Home
      </h1>
      <h1 className="text-xl font-bold text-white hover:text-green-800 cursor-pointer">
        Products
      </h1>
      <h1 className="text-xl font-bold text-white hover:text-green-800 cursor-pointer">
        Users เย้ๆๆ🍜
      </h1>
      <SplashCursor />
    </div>
  );
};

export default App;
