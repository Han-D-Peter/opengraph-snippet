import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  function copyToClipboard() {
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedImg = encodeURIComponent(img);
    const url = `https://opengraph-snippet.vercel.app/gen?title=${encodedTitle}&content=${encodedDescription}&img=${encodedImg}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="내용"
          />
        </div>
        <div>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="이미지 있으면 이미지 주소"
          />
        </div>
        <div>
          <button onClick={copyToClipboard}>복사하기</button>
        </div>
      </div>
    </div>
  );
}
