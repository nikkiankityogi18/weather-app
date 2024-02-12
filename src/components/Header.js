import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex justify-center items-center py-4 bg-gray-600">
      <Link to="/">
        <h2 className="p-2 md:mx-6 mx-3 font-bold md:text-xl text-lg cursor-pointer hover:border-b-2 hover:border-blue-300 text-white ">
          Weather App
        </h2>
      </Link>
      <Link to="/maptree">
        <h2 className="p-2 md:mx-6 mx-3 font-bold md:text-xl text-lg cursor-pointer hover:border-b-2 hover:border-blue-300  text-white">
          Tree Map
        </h2>
      </Link>
    </div>
  );
};
export default Header;
