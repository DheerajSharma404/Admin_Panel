import { SignIn } from "@clerk/clerk-react";

const LogIn = () => {
  return (
    <div className="h-screen flex  flex-col items-center justify-start">
      <div className=" flex  items-center justify-center">
        <img src="/assets/logo.png" alt="Mentoons Logo" className="w-[30%]" />
      </div>
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default LogIn;
