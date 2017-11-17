import {Component, ViewChild} from '@angular/core';
import {BlogService} from '../blog.service';
import {BlogPost} from "../blog-post";
import {ModalDirective} from "ng2-bootstrap";
import {NgUploaderOptions} from "ngx-uploader";
import {CONFIG_ENV} from "../../../app.config";
@Component({
  selector: 'blog-edit-post',
  templateUrl: './blog-edit-post.html',
  styles: ['th.ng2-smart-th.item {padding-right: 18px!important;} ']
})

export class BlogEditPostComponent {

  @ViewChild('blogPostEditModal') blogPostEditModal: ModalDirective;

  public PATH_SERVER = CONFIG_ENV._SERVER;

  public postId: number;

  public blogPostData: BlogPost;

  public blogPostCategories: any = [];

  public selectedPostCategory: any = [];

  public defaultPicture = 'assets/img/theme/no-image.png';
  public profile: any = {
    picture: 'assets/img/theme/no-image.png'
  };
  public uploaderOptions: NgUploaderOptions = {
    url: this.PATH_SERVER + '&c=blog&m=upload_image_post',
    data: {
      post_id: 0
    }
  };

  constructor(private _blogService: BlogService) {

    this.blogPostData = new BlogPost(null, null, null, null, '', '', '', '', '', '', '', '', null);

    this._blogService.editPostShowEditModal$.subscribe(
      data => {
        this.postId = data;
        this.showEditModal(this.postId);
      }
    );

  }

  public getAllBlogCategories() {
    this._blogService.getAllBlogCategories().subscribe(
      (data) => { this.blogPostCategories = data; },
      (error) => {},
      () => {
        let index = this.blogPostCategories.map(function(e) { return e.id; }).indexOf(this.blogPostData.blog_category_id);
        this.selectedPostCategory = this.blogPostCategories[index];
      }
    );
  }

  public showEditModal(postId) {
    let blogPostData;
    this._blogService.getBlogPostById(postId).subscribe(
      (data) => {blogPostData = data},
      (error) => {},
      () => {
        // console.log(blogPostData);
        this.blogPostData = blogPostData;
        this.profile.picture = this.blogPostData.img_src;
        this.uploaderOptions.data.post_id = this.blogPostData.id;
        this.getAllBlogCategories();
      }
    );
    this.blogPostEditModal.show();
    console.log('edit post');
  }

  public hideBlogPostEditModal() {
    this.blogPostEditModal.hide();
  }

  public onUpdateBlogPost() {

    this.blogPostData.blog_category_id = this.selectedPostCategory.id;

    this._blogService.updateBlogPost(this.blogPostData).subscribe(
      (error) => {},
      () => {
        console.log('updated');
        this.hideBlogPostEditModal();
        this._blogService.callReloadListBlogPost();
      }
    );
  }
}


