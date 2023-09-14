import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [videos, setVideos] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataJSON = Object.fromEntries(formData.entries());
    let res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify(formDataJSON),
    });
    res = await res.json();
    console.log(res);
    setVideos(res.items ?? []);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Youtube</title>
      </Head>
      <main className={`${inter.className} w-screen`}>
        <div className="w-full max-w-screen-xl mb-4">
          <form
            className="flex justify-between w-full gap-8 p-4"
            onSubmit={onSubmit}
          >
            <Image
              src="/logo.svg"
              alt="logo"
              className="ml-4 rounded-lg cursor-pointer"
              width={97}
              height={20}
            />
            <div className="flex w-full max-w-screen-md border shadow rounded-xl">
              <input
                type="text"
                name="search"
                className="px-3 py-2 border-r grow rounded-l-xl outline outline-0 focus:shadow-inner focus:outline-1 focus:outline-gray-400/80"
                placeholder="Search"
              />
              <button className="flex items-center justify-center w-10 rounded-r-xl bg-gray-100/50">
                <Image
                  src="/search.svg"
                  alt="search"
                  className="rounded-lg cursor-pointer"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center px-8">
          <div className="w-full max-w-[1720px] flex">
            <div className="mr-4 grow">
              <iframe
                type="text/html"
                className="w-full outline-none aspect-video"
                src={`http://www.youtube.com/embed/${
                  videos[0]?.id?.videoId ?? ""
                }?enablejsapi=1`}
              />
              <p className="py-4 text-xl font-semibold">
                {videos[0]?.snippet?.title ?? ""}
              </p>
              <p>{videos[0]?.snippet?.description ?? ""}</p>
            </div>
            <div className="w-1/4 p-2">
              {console.log(videos)}
              {videos.map((e) => (
                <div
                  key={e.id?.videoId}
                  className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100/80 rounded-xl"
                  onClick={() => {
                    setVideos((state) => [
                      state.filter(
                        (ele) => ele.id.videoId === e.id?.videoId
                      )[0],
                      ...state.filter(
                        (ele) => ele.id.videoId !== e.id?.videoId
                      ),
                    ]);
                  }}
                >
                  <div className="min-w-fit">
                    <img
                      src={e.snippet.thumbnails.default.url}
                      alt={e.snippet.title}
                      width={e.snippet.thumbnails.default.width ?? 120}
                      height={e.snippet.thumbnails.default.height ?? 94}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-semibold">{e.snippet.title}</p>
                    <p className="text-xs">{e.snippet.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
