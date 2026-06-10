import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import toast from "react-hot-toast";
import {
  ArrowRightIcon,
  CheckIcon,
  CodeXml,
  Sparkles,
  Users,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-accent/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="size-10 rounded-xl bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 bg-clip-text text-transparent font-mono tracking-wider">
                CodeXa
              </span>

              <span className="text-xs text-base-content/60 font-medium -mt-1 tracking-wider">
                Code Together
              </span>
            </div>
          </Link>

          {/* Auth Btn */}
          <SignInButton>
            <button
              className="group px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 rounded-xl text-white font-semibold text-sm shadow-lg
            hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="badge bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 badge-lg">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl  font-black leading-tight">
              <span className="bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Code Together
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="text-xl text-base-contet/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborartive coding interview and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <SignInButton>
                <button className="btn bg-emerald-500 btn-lg rounded-full text-black font-bold">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-lg btn-outline rounded-full">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-green-500">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>

              <div className="stat">
                <div className="stat-value text-emerald-500">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>

              <div className="stat">
                <div className="stat-value text-teal-500">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <img
            src="/hero.png"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100
            hover:scale-105 transition-transform duration-500"
            alt="hero img"
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-emerald-500 font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-accent/10 rounded-2xl mb-4 flex justify-center items-center">
                <VideoIcon className="size-8 text-emerald-500" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during
                interview
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-accent/10 rounded-2xl mb-4 flex justify-center items-center">
                <CodeXml className="size-8 text-emerald-500" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-accent/10 rounded-2xl mb-4 flex justify-center items-center">
                <Users className="size-8 text-emerald-500" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /*
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
        </Show>*/
}
