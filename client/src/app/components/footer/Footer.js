import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="underline text-blue-400">
          Copyright &copy; {year} Artivia. All rights reserved!
        </p>
        <ul className="flex gap-4 mt-4 md:mt-0">
          <li>
            <Link href="#">
              <Twitter/>
            </Link>
          </li>
          <li>
            <Link href="https://facebook.com/">
              <Facebook/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Instagram/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Youtube/>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}