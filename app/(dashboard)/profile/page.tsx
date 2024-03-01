import { fetchOrgenerateTokens } from "@/utils/actions";
import { UserProfile, auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "profile page where you can edit your profile",
  openGraph: {
    title: "Mezo-GPT",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/profile`,
    images: [
      {
        url: `${process.env.SITE_URL}/opengraph-imageConfigDefault.png`,
        width: 600,
        height: 600,
      },
    ],
    description:
      "chat app like Chat-gpt and tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
  },
};

const ProfilePage = async () => {
  const { userId } = auth();
  const tokens = await fetchOrgenerateTokens(userId as string);
  return (
    <div className="w-full flex justify-center items-start flex-col gap-4">
      <p className="mb-8 font-extrabold text-2xl text-center w-full">
        Tokens : {tokens}
      </p>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
