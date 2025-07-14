import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="bg-black text-white flex justify-between p-1 h-20">
        <div className="flex font-extrabold text-3xl pt-4 pl-4"> 
            <h1><Link to={"/"}> musing.</Link></h1>
        </div>
        <ul className="flex pt-6 pl-23">
            <li className="mx-6  flex">
                <Link to={"/about"}> About Us</Link>
            </li>
             <li className="mx-6 flex">
                <Link to={"/blogs"}> Our Blogs</Link>
             </li>
              <li className="mx-6 flex">
                <Link to={"/contact"}> Contact</Link>
              </li>
        </ul>
        <div className="flex">
          <input className="  border rounded-2xl p-2 mx-4 mt-7.5 hover:cursor-pointer h-5" type="text" name="" id="" />
        <div className="flex pt-6 pr-7"> Search</div>
        </div>
    </div>
  )
}

export default Header