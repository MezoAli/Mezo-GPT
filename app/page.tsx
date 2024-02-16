import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">Mezo-GPT</h1>
          <p className="py-6 capitalize text-2xl leading-loose">
            chat app like Chat-gpt and tour gide generator to specify where you
            need to go and let us decide the beautiful places to visit
          </p>
          <Link href="/chat" className="btn btn-secondary">
            Get Started
          </Link>
          {/* <UserButton /> */}
        </div>
      </div>
    </div>
  );
}
