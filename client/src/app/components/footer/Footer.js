import Link from "next/link";
import Image from "next/image";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="underline text-blue-400">
          Copyright &copy; {year} NFTmarket. All rights reserved!
        </p>
        <ul className="flex gap-4 mt-4 md:mt-0">
          <li>
            <Link href="#">
              <Image src="/x.png" width={40} height={40} alt="x logo" />
            </Link>
          </li>
          <li>
            <Link href="https://telegram.org/">
              <Image
                src="/telegram.png"
                width={40}
                height={40}
                alt="telegram logo"
              />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image
                src="/youtube.png"
                width={40}
                height={40}
                alt="youtube logo"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}