
const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between px-60 py-3'>
      <div className="logo font-bold text-white"><span className="text-green-700">&lt;</span>Pass<span className="text-green-700">OP /&gt;</span></div>
      <ul className="flex gap-4 text-white">
        <li>
          <a className="hover:font-bold" href="/">Home</a>
        </li>
        <li>
          <a className="hover:font-bold" href="/About">About</a>
        </li>
        <li>
          <a className="hover:font-bold" href="/Contact">Contact</a>
        </li>
      </ul>
      <div className="flex gap-4 text-white justify-center items-center cursor-pointer hover:font-bold ring-1 ring-white rounded-xl p-1">
        GitHub
        <img width={20} className="invert" src="icons/github.svg" alt="" />
      </div>
    </nav>
  )
}

export default Navbar
