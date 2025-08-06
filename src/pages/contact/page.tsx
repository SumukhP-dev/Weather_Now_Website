import NavBar from "@/react-weather-now-website/src/components/NavBar";
import team from "@/app/team.png";
import Image from "next/image";
import { Button } from "@/react-weather-now-website/src/components/Button";
import facebook_logo from "@/app/icons/facebook_icon.png";
import twitter_logo from "@/app/icons/twitter_logo.png";
import instagram_logo from "@/app/icons/instagram_icon.png";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <h1 className="mt-5 flex h-10 items-center justify-center text-6xl">
        Contact Us
      </h1>
      <div className="m-20 flex items-center justify-center">
        <div>
          <p className="text-2xl w-7/8 mr-5">
            Hi, we are the team behind Weather Now. <br />
            If you have any questions or want to contribute, email us at
            example@gmail.com or contact us using the icons below.
          </p>

          <div className="flex mt-5">
            <a
              target="_blank"
              href="https://facebook.com/"
              rel="noopener noreferrer"
            >
              <Button className="w-20 h-20" aria-disabled={true}>
                {" "}
                <Image src={facebook_logo} alt="facebook logo"></Image>
              </Button>
            </a>

            <a
              target="_blank"
              href="https://twitter.com/"
              rel="noopener noreferrer"
            >
              <Button className="w-20 h-20 ml-5" aria-disabled={true}>
                {" "}
                <Image src={twitter_logo} alt="facebook logo"></Image>
              </Button>
            </a>

            <a
              target="_blank"
              href="https://instagram.com/"
              rel="noopener noreferrer"
            >
              <Button className="w-20 h-20 ml-5" aria-disabled={true}>
                {" "}
                <Image src={instagram_logo} alt="facebook logo"></Image>
              </Button>
            </a>
          </div>
        </div>
        <Image className=" w-1/2" src={team} alt="picture of team"></Image>
      </div>
    </>
  );
}
