"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPosts, type Post } from "@/lib/board-data";
import BoardHeader from "./BoardHeader";
import BoardMessage from "./BoardMessage";
import PostList from "./PostList";

export default function BoardContent() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetchPosts()
      .then((data) => !ignore && setPosts(data))
      .catch(() => !ignore && setFailed(true));
    return () => {
      ignore = true;
    };
  }, []);

  const handleDeleted = useCallback((id: number) => {
    setPosts((prev) => prev && prev.filter((post) => post.id !== id));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <BoardHeader count={posts?.length ?? 0} />
      {failed ? (
        <BoardMessage>글 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</BoardMessage>
      ) : posts ? (
        <PostList posts={posts} onDeleted={handleDeleted} />
      ) : (
        <BoardMessage>불러오는 중...</BoardMessage>
      )}
    </div>
  );
}
