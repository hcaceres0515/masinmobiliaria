export class BlogPost {

  //noinspection TsLint
  constructor(
    public id: number,
    public user_id: number,
    public office_id: number,
    public blog_category_id: number,
    public blog_category_name: string,
    public title: string,
    public slug: string,
    public overview: string,
    public content: string,
    public img_src: string,
    public createdAt: string,
    public tags: string,
    public status: number
  ){}

}
