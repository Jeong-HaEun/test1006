"use client";

import { useEffect, useState } from "react";
import { fetchPost, type Post } from "@/lib/board-data";

type PostState = { status: "loading" } | { status: "missing" } | { status: "error" } | { status: "ready"; post: Post };

// 상세/수정 페이지에서 글 하나를 불러온다.
export function usePost(id: number): PostState {
  const [state, setState] = useState<PostState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    fetchPost(id)
      .then((post) => !ignore && setState(post ? { status: "ready", post } : { status: "missing" }))
      .catch(() => !ignore && setState({ status: "error" }));
    return () => {
      ignore = true;
    };
  }, [id]);

  return state;
}
