'use client';
import Link from 'next/link';

export default function Navbar() {
  const user=false;
  const links = [
    { label: 'All Blog', href: '/all-blogs' },
    { label: 'Add Blog', href: '/add-blog' },
    { label: 'My Blogs', href: '/my-blogs' },
    { label: 'Dashboard', href: '/dashboard' },
    
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          NexThoughts
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">

{
  user ? (
    <button className='btn'>Logout</button>
  ) : (
    <>
      <Link href="/signup" className="btn">
        Signup
      </Link>
      <Link href="/login" className="btn">
        Login
      </Link>
    </>
  )
}


       
      
      </div>
    </div>
  );
}
