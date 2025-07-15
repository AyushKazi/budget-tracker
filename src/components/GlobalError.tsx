import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type GlobalErrorProps = {
  error: Error;
  reset?: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">Something went wrong</h1>
      <p className="text-center mt-4 text-red-500">
        {error.message || "Unknown error"}
      </p>
      <div className="text-center mt-6 flex gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
        {reset && (
          <Button variant="default" size="sm" onClick={reset}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
