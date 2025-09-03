import SplitText from "./ui/SplitText";

const Slogan = ({ text, ...rest }) => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div>
      <SplitText
        text={text}
        onLetterAnimationComplete={handleAnimationComplete}
        {...rest}
      />
    </div>
  );
};

export default Slogan;
