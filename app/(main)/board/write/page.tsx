import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import BoardGate from "@/components/board/BoardGate";
import PostForm from "@/components/board/PostForm";

export const metadata = { title: "글쓰기 - 꿈꾸리" };

export default function BoardWritePage() {
  return (
    <PageContainer>
      <BoardGate>
        <div className="mx-auto max-w-3xl">
          <PageHeader title="글쓰기" crumbs={[{ label: "자유 게시판", href: "/board" }]} />
          <PostForm />
        </div>
      </BoardGate>
    </PageContainer>
  );
}
