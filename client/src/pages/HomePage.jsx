import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => toast.success("Here is the toast")}>
        Click Me
      </button>
      <header className="flex gap-2 p-3">
        <Show when="signed-out">
          <SignInButton>
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-primary">Sign Up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  );
};

export default HomePage;
