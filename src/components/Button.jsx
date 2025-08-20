import { handleClick } from "../utils/handleClick.js";

export default Button = () => {
    return (
        <button
            onClick={handleClick}
            className="cursor-pointerbg-[#006A71] w-32 rounded-xl"
        >
            Click me!
        </button>

    );
}