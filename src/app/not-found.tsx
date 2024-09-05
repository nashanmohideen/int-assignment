import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Sorry ! The required page is not found. </p>
      <button className="bg-black text-white w-[200px] h-[40px] bg-blend-darken rounded-lg ">
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}
