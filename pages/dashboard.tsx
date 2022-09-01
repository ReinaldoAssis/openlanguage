import { Button, Popover } from "@nextui-org/react";
import { useEffect, useState } from "react";
import RandPhrase from "../components/dashboard/modes/random phrases/RandPhrase";
import { Navbar } from "../components/dashboard/Navbar";

export default function Dashboard() {
  return (
    <div style={{ overflow: "hidden" }}>
      <RandPhrase />
    </div>
  );
}
