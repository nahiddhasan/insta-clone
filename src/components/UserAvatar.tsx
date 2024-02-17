import Image from "next/image";
import Link from "next/link";
type props = {
  image: string | null;
  username: string;
  name?: string;
};
const UserAvatar = ({ image, username, name }: props) => {
  return (
    <Link href={`/u/${username}`} className="flex items-center">
      <Image
        src={image || "/img/avatar.png"}
        height={32}
        width={32}
        alt="UserImg"
        className="rounded-full object-cover mr-2"
      />
      <div className="flex flex-col">
        <span className="font-bold">{username}</span>
        <span className="font-bold text-sm">{name && name}</span>
      </div>
    </Link>
  );
};

export default UserAvatar;
