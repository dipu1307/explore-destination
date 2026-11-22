'use client';

import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "font-medium text-[#0c0b0b] transition-colors hover:text-[#15a1bf]";



const Navbar = () => {

      const {data: session} = authClient.useSession();
      console.log(session);
      const user = session?.user;
      console.log(user);
      const handleSignOut = async()=>{
        await authClient.signOut();
      }
    return (
      <div className="container mx-auto my-8">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
          <ul className="flex gap-5">
            <li>
              <Link href={"/"} className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/destination"} className={linkClass}>
                Destinations
              </Link>
            </li>
            <li>
              <Link href={"/my-bookings"} className={linkClass}>
                My Bookings
              </Link>
            </li>
            <li>
              <Link href={"/add-destination"} className={linkClass}>
                Add Destination
              </Link>
            </li>
          </ul>
          <div>
            <Image
              src={"/assets/Wanderlast.png"}
              height={24}
              width={162}
              alt="logo"
              className="h-6 w-auto"
            />
          </div>
          <ul className="flex items-center justify-self-end gap-5">
            <li>
              <Link
                href={"/profile"}
                className={`${linkClass} flex gap-1 items-center`}
              >
                <User size={16} /> Profile
              </Link>
            </li>
            { user ? <>
            <li>
              <Avatar>
               <Avatar.Image alt="John Doe" />
               {/* if avatar image available then use src after alt  */}
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
      </li> 
      <li><Button onClick={handleSignOut} variant="danger">Logout</Button></li> </> 
      : <>
                
                <li>
                  <Link href={"/login"} className={linkClass}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href={"/signup"} className={linkClass}>
                    Sign Up
                  </Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    );
};

export default Navbar;