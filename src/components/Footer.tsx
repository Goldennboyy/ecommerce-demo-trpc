import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
function Footer() {
  return (
    <footer className="relative bottom-0 flex h-20 w-full flex-row items-center justify-center gap-3">
      <div className="flex gap-2">
        <a href="https://github.com/Goldennboyy">
          {" "}
          <AiOutlineGithub size={25} />
        </a>
        <a href="https://www.linkedin.com/in/emmanuel-ezeagwula-87b325251/">
          {" "}
          <AiOutlineLinkedin size={25} />
        </a>
      </div>
      <div>
        <span className="text-slate-100">
          {" "}
          Designed & Built with ❤️ by Emmanuel Ezeagwula with T3 stack{" "}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
