import EditPostModal from "@/components/EditPostModal";
import { auth } from "@/utils/auth";
import { getSinglePost } from "@/utils/data";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = params;
  const singlePost = await getSinglePost(id);
  if (!singlePost) {
    return null;
  }
  if (!userId) {
    return "not loged in!";
  }
  return (
    <EditPostModal
      file={singlePost?.image}
      postId={singlePost?.id}
      userId={userId}
      caption={singlePost?.caption}
    />
  );
};

export default EditPage;
