import { Navbar } from "@/components/Public/Navbar/navbar";
import HomePage from "./(public)/home/page";

export default function Home() {
  return (
   <div className="flex flex-col">
     <Navbar/>
     <HomePage/>
   </div>
  );
}
