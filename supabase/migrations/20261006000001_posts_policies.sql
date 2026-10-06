-- 읽기: 로그인한 회원 누구나
create policy "posts_select_authenticated" on public.posts
  for select to authenticated
  using (true);

-- 쓰기: 로그인한 회원이 자기 계정으로만
create policy "posts_insert_own" on public.posts
  for insert to authenticated
  with check ((select auth.uid()) = author_id);

-- 수정: 글 작성자 본인만
create policy "posts_update_own" on public.posts
  for update to authenticated
  using ((select auth.uid()) = author_id)
  with check ((select auth.uid()) = author_id);

-- 삭제: 글 작성자 본인만
create policy "posts_delete_own" on public.posts
  for delete to authenticated
  using ((select auth.uid()) = author_id);
