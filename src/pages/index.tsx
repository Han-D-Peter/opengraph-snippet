import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("hello");
  const [description, setDescription] = useState("byebye");
  const [img, setImg] = useState(
    "https://www.imgacademy.com/sites/default/files/img-academy-performance-center.jpg"
  );

  function copyToClipboard() {
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedImg = encodeURIComponent(img);
    const url = `https://opengraph-snippet.vercel.app/gen?title=${encodedTitle}&description=${encodedDescription}&img=${encodedImg}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        placeholder="Image URL"
      />
      <button onClick={copyToClipboard}>복사하기</button>
    </div>
  );
}
