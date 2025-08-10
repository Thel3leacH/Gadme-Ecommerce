import Masonry from "./components/ui/Masonry";
import SplitText from "./components/ui/SplitText";

const App = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const items = [
    {
      id: "1",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 450,
    },
    {
      id: "5",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 450,
    },
    {
      id: "6",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 450,
    },
    {
      id: "7",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 450,
    },
    {
      id: "8",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 450,
    },
    // ... more items
  ];

  return (
    <div className="">
      <header className="bg-[#006A71] text-shadow-cyan-50 text-amber-50 py-7">
        <nav className="md:flex justify-end gap-12 md:px-6">
          <div className="md:hover:text-amber-300">Home</div>
          <div className="md:hover:text-amber-300">Products</div>
          <div className="md:hover:text-amber-300">About</div>
        </nav>
      </header>
      <main>
        <div className="flex flex-col">
          <h1 className="text-5xl font-semibold uppercase text-center">
            Gad-me
          </h1>
          <SplitText
            text="Experience The Difference"
            className="text-6xl font-semibold py-5"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
