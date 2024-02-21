import { UserButton, currentUser } from "@clerk/nextjs";
const UserProfile = async () => {
  const user = await currentUser();

  return (
    <div className="flex w-full px-4 justify-between items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <h3 className="text-lg text-base-content font-semibold">
        {user?.emailAddresses[0].emailAddress}
      </h3>
    </div>
  );
};

export default UserProfile;
