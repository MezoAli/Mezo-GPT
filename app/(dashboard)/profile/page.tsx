import { fetchOrgenerateTokens } from "@/utils/actions";
import { UserProfile, auth } from "@clerk/nextjs";

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
