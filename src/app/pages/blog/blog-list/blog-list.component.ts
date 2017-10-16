
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { BlogPost } from '../blog-post';
import { NgUploaderOptions } from 'ngx-uploader';

import '../../editors/components/ckeditor/ckeditor.loader';
import 'ckeditor';
import 'style-loader!../../editors/components/ckeditor/ckeditor.scss';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {BlogService} from '../blog.service';
import {CONFIG_ENV} from "../../../app.config";

@Component({
  selector: 'actions-blog-post-table',
  templateUrl: './actions-blog-post.html',
})
export class ActionsBlogPostTableComponent implements  OnInit {

  @Input() value: any;
  @Input() rowData: any;

  public blogPost: any;

  constructor(private _blogService: BlogService){}

  ngOnInit() {
    this.blogPost = this.value;
  }

  onDeleteBlogPost(blogPostId) {
    this._blogService.callShowConfirmModalServiceParam(blogPostId);
  }
}

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.html',
  styles: ['th.ng2-smart-th.item {padding-right: 18px!important;} ']
})


export class BlogListComponent implements OnInit{

  @ViewChild('blogPostAddModal') blogPostAddModal: ModalDirective;

  public PATH_SERVER = CONFIG_ENV._SERVER;

  public blogPostData: BlogPost;

  public blogPostList: any = [];

  // public ckeditorContent: string = '';
  public config = {
    uiColor: '#F0F3F4',
    height: '600',
  };

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: any = {
    picture: 'assets/img/theme/no-photo.png'
  };
  public uploaderOptions: NgUploaderOptions = {
    url: this.PATH_SERVER + '&c=blog&m=upload_image_post',
    data: {
      post_id: 0
    }
  };

  public showUploadImageBox: boolean = false;

  public blogPostCategories: any = [];

  public selectedPostCategory: any = [];

  public selectedDeleteEvent: any;

  public blogPostId: any;

  source: LocalDataSource;

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      title: {
        title: 'Titulo',
      },
      overview: {
        title: 'Resumen',
        width: '250px',
      },
      createdAt: {
        title: 'Creado',
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ActionsBlogPostTableComponent,
        filter: false
      }
    },
  };

  constructor(private _blogService: BlogService) {
    this.blogPostData = new BlogPost(null, null, null, null, '', '', '', '', '', '', '', '', null);

    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.getAllBlogPosts();
    this.getAllBlogCategories();
  }

  showBlogPostAddModal(): void {
    this.blogPostAddModal.show();
  }

  hideBlogPostAddModal(): void {
    this.blogPostAddModal.hide();
  }

  getAllBlogPosts() {
    this._blogService.getAllBlogPosts().subscribe(
      (data) => { this.blogPostList = data; },
      (error) => {},
      () => {
        this.blogPostList = this.sourceLoadTable(this.blogPostList);
        this.source.load(this.blogPostList);
        // console.log(this.blogPostList);
      }
    );
  }

  getAllBlogCategories() {
    this._blogService.getAllBlogCategories().subscribe(
      (data) => { this.blogPostCategories = data; },
      (error) => {},
      () => {
        this.selectedPostCategory = this.blogPostCategories[0];
        // console.log(this.blogPostCategories);
      }
    );
  }

  sourceLoadTable(data) {

    Object(data).forEach((value) => {
      value.item = { id: value.id, user_id: value.user_id, title: value.title };
    });

    return data;
  }

  onAddBlogPost() {

    let userData = JSON.parse(localStorage.getItem('userData'));
    this.blogPostData.user_id = userData.id;
    this.blogPostData.office_id = userData.office_id;
    this.blogPostData.blog_category_id = this.selectedPostCategory.id;

    console.log(this.blogPostData);

    this._blogService.addBlogPost(this.blogPostData).subscribe(
      data => this.blogPostId = (data),
      (error) => {},
      () => {
        this.getAllBlogPosts();
        this.uploaderOptions.data.post_id = this.blogPostId;
        console.log(this.blogPostId);
        this.showUploadImageBox = true;
      }
    );
  }

  onDeleteConfirm(event): void {

    console.log(event);
    this.selectedDeleteEvent = event;
    this._blogService.callShowConfirmModalService();

  }

  uploadCompleted() {
    this.hideBlogPostAddModal();
  }

  deleteBlogPost(blogPostId) {
    // console.log(blogPostId);

    this._blogService.deleteBlogPost(blogPostId).subscribe(
      (error) => {},
      () => {
        this.getAllBlogPosts();
      }
    );
  }
}
