import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-md rounded-lg overflow-hidden w-[25rem] border border-slate-600">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center text-slate-200">
            {active ? "Sign Up" : "Sign In"}
          </h2>
          <div className="mt-8 space-y-5">
            {active ? <Signup /> : <Login />}
          </div>
          <div className="mt-8 text-center">
            <span className="text-slate-400">
              {active ? "Already have an account?" : "Don't have an account?"}
            </span>
            <Button
              variant="ghost"
              onClick={() => setActive(!active)}
              className="ml-2 text-indigo-400 hover:text-indigo-300"
            >
              {active ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
