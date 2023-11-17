import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | YouTube chapter generator",
  metadataBase: new URL('https://yt-chapter-generator.peter-kuhmann.de'),
};

export default function PrivacyPolicyPage() {
  return (
    <div className={"container prose dark:prose-invert"}>
      <h1>Privacy Policy</h1>
      <p>
        This website does not collect any personal data. All the functionality
        that this website offers is done in a user's client (browser).
      </p>

      <p>
        The only data required to process is all the technical data to serve
        this website. This includes the IP address and the requested URL. This
        data is stored for up to a month. This information helps us to detect
        hacker attacks or misuse of the provided service.
      </p>

      <h2>Hosting</h2>
      <p>The website is hosted using Vercel.</p>

      <h2>Contact</h2>
      <p>
        Responsible for any data processing related to this website/application
        is:
      </p>

      <p>
        Peter Kuhmann
        <br />
        Engelswisch 50
        <br />
        23552 Lübeck
        <br />
        Germany
        <br />
        Telefon: +49 176 20126866
        <br />
        E-Mail: info@peter-kuhmann.de
      </p>
    </div>
  );
}
