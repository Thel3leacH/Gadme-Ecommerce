import Masonry from "./ui/Masonry";

const HotProducts = () => {
  const items = [
    {
      id: "1",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/one",
      height: 500,
    },
    {
      id: "2",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/two",
      height: 500,
    },
    {
      id: "3",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 500,
    },
    {
      id: "4",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 500,
    },
    {
      id: "5",
      img: "https://images.unsplash.com/photo-1693621947585-7b7d94149af4?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://example.com/three",
      height: 500,
    },

    // ... more items
  ];

  return (
    <div>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="random"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
    </div>
  );
};

export default HotProducts;
