import PageContainer from "@/components/common/PageContainer";
import BoardGate from "@/components/board/BoardGate";
import BoardContent from "@/components/board/BoardContent";

export const metadata = { title: "자유 게시판 - 꿈꾸리" };

export default function BoardPage() {
  return (
    <PageContainer>
      <BoardGate>
        <BoardContent />
      </BoardGate>
    </PageContainer>
  );
}
