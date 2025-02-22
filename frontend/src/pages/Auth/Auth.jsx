import Login from "./Login";

const Auth = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-md rounded-lg overflow-hidden w-[25rem] border border-slate-600">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center text-slate-200">
          Login
          </h2>
          <div className="mt-8 space-y-5">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;