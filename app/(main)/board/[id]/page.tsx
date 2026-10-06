import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import BoardGate from "@/components/board/BoardGate";
import PostDetail from "@/components/board/PostDetail";

export default async function PostDetailPage({ params }: PageProps<"/board/[id]">) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  return (
    <PageContainer>
      <BoardGate>
        <PostDetail id={id} />
      </BoardGate>
    </PageContainer>
  );
}
