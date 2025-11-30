import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p>Hello, Habtamu</p>
      <span>Clink <Link href="/documents/2435"><span className="text-blue-500">here</span></Link> to go to document id.</span>
    </div>
  );
}
