import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => toast.success("Hello")}>Click me</Button>
      <Toaster position="bottom-center" richColors expand />
    </div>
  );
}

export default App;
