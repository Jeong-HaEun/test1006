import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/auth-context";

export type Post = {
  id: number;
  title: string;
  content: string;
  authorId: string | null;
  authorName: string;
  createdAt: string;
  views: number;
};

type PostRow = {
  id: number;
  title: string;
  content: string | null;
  author_id: string | null;
  author_name: string | null;
  created_at: string;
  views: number | null;
};

export type PostInput = { title: string; content: string };

function toPost(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content ?? "",
    authorId: row.author_id,
    authorName: row.author_name ?? "알 수 없음",
    // YYYY-MM-DD (사용자 현지 시간 기준)
    createdAt: new Date(row.created_at).toLocaleDateString("sv-SE"),
    views: row.views ?? 0,
  };
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: false });
  if (error) throw error;
  return data.map(toPost);
}

export async function fetchPost(id: number): Promise<Post | null> {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data && toPost(data);
}

export async function createPost(input: PostInput, author: User): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...input, author_id: author.id, author_name: author.name })
    .select()
    .single();
  if (error) throw error;
  return toPost(data);
}

// 권한이 없으면 RLS가 0행을 돌려주므로 single()이 에러를 던진다.
export async function updatePost(id: number, input: PostInput): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return toPost(data);
}

export async function deletePost(id: number): Promise<void> {
  const { data, error } = await supabase.from("posts").delete().eq("id", id).select();
  if (error) throw error;
  if (data.length === 0) throw new Error("삭제할 권한이 없습니다.");
}
