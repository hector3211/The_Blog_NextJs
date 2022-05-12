import Link from "next/link";
import React from "react";

export default function index(props) {
  return (
    <div>
      <Link href={"/signup"}></Link>
      <Link href={"/index"}></Link>
    </div>
  );
}
