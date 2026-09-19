import { LoaderCircle } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full mt-10">
      <LoaderCircle size={20} className="animate-[spin_0.8s_linear_infinite]" />
      Loading...
    </div>
  );
}

export default LoadingScreen;
