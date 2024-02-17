export const uploadImage = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "insta-clone");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/nahiddhasan/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  } catch (error) {
    console.log(error);
  }
};
