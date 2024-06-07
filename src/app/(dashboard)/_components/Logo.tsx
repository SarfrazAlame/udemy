import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex h-full items-center">
      <Image src="/logo.svg" height={100} width={100} alt="logo" />
      <span className="text-3xl text-sky-700">
        <span className="text-pink-800">U</span>demy
      </span>
    </div>
  );
};

export default Logo;
