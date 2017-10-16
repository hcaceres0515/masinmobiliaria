import { Injectable } from '@angular/core';
import { CONFIG_ENV } from '../../app.config';
import { Http, RequestOptions, Headers } from '@angular/http';
import {Subject} from "rxjs";

@Injectable()
export class BlogService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  public methodCallSourceBlogModalConfirm = new Subject<any>();

  methodCallBlogModalConfirm$ = this.methodCallSourceBlogModalConfirm.asObservable();

  public headers: Headers;
  public options: RequestOptions;

  constructor(private _http: Http) {

    this.headers = new Headers({ 'Content-Type': 'multipart/form-data' , 'Accept': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers, method: 'post' });

  }

  // Service message commands
  callShowConfirmModalService() {
    this.methodCallSourceBlogModalConfirm.next();
  }

  // Service message commands
  callShowConfirmModalServiceParam(data) {
    this.methodCallSourceBlogModalConfirm.next(data);
  }

  /* Blog Category Functions */

  getAllBlogCategories() {
    return this._http.get(this.PATH_SERVER + '&c=blog&m=get_all_categories')
      .map(res => res.json());
  }

  addBlogCategory(categoryName) {
    let blogCategory = JSON.stringify({category_name: categoryName});
    return this._http.post(this.PATH_SERVER + '&c=blog&m=add_blog_category', blogCategory, this.options)
      .map(res => res.json());
  }

  editBlogCategory(categoryId, categoryName) {
    let blogCategory = JSON.stringify({category_id: categoryId, category_name: categoryName});
    return this._http.post(this.PATH_SERVER + '&c=blog&m=edit_blog_category', blogCategory, this.options)
      .map(res => res.json());
  }

  deleteBlogCategory(categoryId) {
    let blogCategory = JSON.stringify({category_id: categoryId});
    return this._http.post(this.PATH_SERVER + '&c=blog&m=delete_blog_category', blogCategory, this.options)
      .map(res => res.json());
  }

  /* -------- */

  /* Blog Posts Functions */

  getAllBlogPosts() {
    return this._http.get(this.PATH_SERVER + '&c=blog&m=get_all_blog_posts')
      .map(res => res.json());
  }

  addBlogPost(post) {
    let blogPost = JSON.stringify(post);
    return this._http.post(this.PATH_SERVER + '&c=blog&m=add_blog_post', blogPost, this.options)
      .map(res => res.json());
  }

  deleteBlogPost(postId) {
    let blogPostId = JSON.stringify({post_id: postId});
    return this._http.post(this.PATH_SERVER + '&c=blog&m=delete_blog_post', blogPostId, this.options)
      .map(res => res.json());
  }

  /* --------- */
}
