import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import BoardGate from "@/components/board/BoardGate";
import PostEdit from "@/components/board/PostEdit";

export const metadata = { title: "글 수정 - 꿈꾸리" };

export default async function PostEditPage({ params }: PageProps<"/board/[id]/edit">) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  return (
    <PageContainer>
      <BoardGate>
        <PostEdit id={id} />
      </BoardGate>
    </PageContainer>
  );
}
