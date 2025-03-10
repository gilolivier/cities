"use client";

import { InputLabel } from "./components/label";
import { InputField } from "./components/input";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <InputLabel labelText="Find music venues near me" />
      <InputField placeholder="Start typing a city" />
    </div>
  );
}
