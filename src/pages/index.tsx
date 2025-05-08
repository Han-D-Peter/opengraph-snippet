import { useEffect, useRef, useState } from "react";
import { clientSupabase } from "./_app";
import { generateUniqueRandomString } from "@/utils/generateUniqueRandonString";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  async function copyToClipboard() {
    const encodedTitle = title || null;
    const encodedDescription = description || null;
    const encodedImg = img || null;
    const encodedRedirectUrl = redirectUrl || null;

    async function generateUniqueLink() {
      const randomText = generateUniqueRandomString();

      // DB에서 중복 여부 확인
      const { data: existingLink } = await clientSupabase
        .from("LINK")
        .select("shorten_link")
        .eq("shorten_link", randomText)
        .single();

      if (existingLink) {
        // 중복된 경우 다시 생성
        return await generateUniqueLink();
      }

      // 중복되지 않은 경우 반환
      return randomText;
    }

    const uniqueRandomText = await generateUniqueLink();

    const { data, error } = await clientSupabase
      .from("LINK")
      .insert({
        shorten_link: uniqueRandomText,
        title: encodedTitle,
        content: encodedDescription,
        img_link: encodedImg,
        redirect_link: encodedRedirectUrl,
      })
      .select();

    if (error) {
      console.error("Failed to insert data:", error);
      return;
    }

    const url = `https://opengraph-snippet.vercel.app/gen/${uniqueRandomText}`;

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
          <input
            type="text"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            placeholder="리다이렉트 주소"
          />
        </div>
        <div>
          <button onClick={copyToClipboard}>복사하기</button>
        </div>
      </div>
    </div>
  );
}
