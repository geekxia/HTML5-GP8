declare namespace API {
  type User = {
    username: string,
    roles: string[]
  }

  type Article = {
    author: {
      avatar_url: string,
      loginname: string
    },
    author_id: string,
    content: string,
    create_at: string,
    good?: boolean,
    id: string,
    last_reply_at: string,
    reply_count: number,
    tab: 'ask' | 'good' | 'job' | 'share',
    title: string,
    top: boolean,
    visit_count: number,
  }
}



