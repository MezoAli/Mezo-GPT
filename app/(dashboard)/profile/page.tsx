import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="w-full flex justify-center items-start">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
