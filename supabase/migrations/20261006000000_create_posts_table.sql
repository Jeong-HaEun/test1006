create table public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text,
  author_id uuid references auth.users (id) on delete set null,
  author_name text,
  views integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.posts enable row level security;

create index posts_author_id_idx on public.posts (author_id);
