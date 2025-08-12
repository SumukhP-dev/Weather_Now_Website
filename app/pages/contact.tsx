import { Button } from "../components/Button";
import twitter_logo from "../assets/images/logos/twitter_logo.png";
import instagram_logo from "../assets/images/logos/instagram_logo.png";
import facebook_logo from "../assets/images/logos/facebook_logo.png";
import team_image from "../assets/images/team/team.jpeg";
import Layout from "../components/Layout";

export default function ContactPage() {
  return (
    <>
      <Layout>
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
                  <img src={facebook_logo} alt="facebook logo"></img>
                </Button>
              </a>

              <a
                target="_blank"
                href="https://twitter.com/"
                rel="noopener noreferrer"
              >
                <Button className="w-20 h-20 ml-5" aria-disabled={true}>
                  <img src={twitter_logo} alt="facebook logo"></img>
                </Button>
              </a>

              <a
                target="_blank"
                href="https://instagram.com/"
                rel="noopener noreferrer"
              >
                <Button className="w-20 h-20 ml-5" aria-disabled={true}>
                  <img src={instagram_logo} alt="facebook logo"></img>
                </Button>
              </a>
            </div>
          </div>
          <img className="w-1/2" src={team_image} alt="picture of team"></img>
        </div>
      </Layout>
    </>
  );
}
