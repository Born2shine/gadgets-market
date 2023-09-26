import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-blue-900  text-gray-100 md: tx-lg">
      <div className="footer-action">
        <Image width={40} height={120} src="/images/logo.jpg" alt="logo" />
        <button>
          <Link href={"/register"}>Sign UP</Link>
        </button>
      </div>
      <div className="lg: flex justify-between items-center">
      <div className="footer-info">
        <div>contact us</div>
        <div>Terms and Conditions</div>
        <div>Privacy</div>
      </div>
      <div className="copyright">
        &#174;copyright 2023 built and design by DrsoadJS
      </div>

      </div>
    </div>
  );
};

export default Footer;
