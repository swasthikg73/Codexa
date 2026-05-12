import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to the App</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  );
}

export default App;
