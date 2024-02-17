import SinglePostModal from "@/components/SinglePostModal";
import { getSinglePost } from "@/utils/data";

const SinglePageModal = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const singlePost = await getSinglePost(id);
  return <SinglePostModal post={singlePost} />;
};

export default SinglePageModal;
