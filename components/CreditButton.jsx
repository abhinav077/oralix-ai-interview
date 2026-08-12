"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { Button } from "./ui/button";

export default function CreditButton({ role, credits }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (role === "INTERVIEWER") {
      window.location.href = "/dashboard";
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="cursor-pointer rounded-full border-2 border-[#1a1a1a] bg-[#ffffeb] text-[#034f46] hover:bg-[#f0d7ff]"
        onClick={handleClick}
      >
        <Coins size={14} />
        <span className=" opacity-70">
          {credits} {role === "INTERVIEWER" ? "Earned" : "Credits"}
        </span>
      </Button>

      <UpgradeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
