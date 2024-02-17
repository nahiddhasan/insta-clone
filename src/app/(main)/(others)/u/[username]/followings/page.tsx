import { auth } from "@/utils/auth";
import { getFollowings } from "@/utils/data";
import FollowingModel from "../_components/FollowingModel";

const FollowingPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const session = await auth();
  const { following } = await getFollowings(username);

  const isFollowing = following.some(
    (follow) => follow.followerId === session?.user?.id
  );

  return (
    <div>
      <FollowingModel
        followers={following}
        username={username}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default FollowingPage;
