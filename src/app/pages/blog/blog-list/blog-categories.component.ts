import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BlogService } from '../blog.service';

@Component({
  selector: 'blog-categories',
  templateUrl: './blog-categories.html'
})

export class BlogCategoriesComponent {

  source: LocalDataSource;

  public blogCategories: any =  [];
  public selectedCategory: any = [];

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      position: 'right',
      columnTitle: 'Acciones',
      add: true,
      edit: true,
      delete: true
    },
    add: {
      addButtonContent: '<i class="ion-plus-round"></i> Agregar Categoria',
      createButtonContent: '<i class="ion-checkmark-round"></i> Guardar',
      cancelButtonContent: '<i class="ion-close"></i> Cancelar',
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar',
      confirmSave: true
    },
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false,
      },
      name: {
        title: 'Nombre',
      }
    },
  };

  constructor(private _blogService: BlogService) {
    this.source = new LocalDataSource();

    this.getCategories();

  }

  getCategories() {
    this._blogService.getAllBlogCategories().subscribe(
      (data) => { this.blogCategories = data; },
      (error) => {},
      () => {
        this.source.load(this.blogCategories);
      }
    )
  }

  saveCategory(event): void {

    if (event.newData.name !== '') {
      event.confirm.resolve();
      this._blogService.addBlogCategory(event.newData.name).subscribe(
        (error) => {},
        () => {
          this.getCategories();
        }
      );
    }

  }

  editCategory(event): void {

    if (event.newData.name !== '') {
      event.confirm.resolve();
      this._blogService.editBlogCategory(event.newData.id, event.newData.name).subscribe(
        (error) => {},
        () => {
          this.getCategories();
        }
      );
    }
  }

  onDeleteConfirm(event): void {

    console.log(event);

    this.selectedCategory = event.data;
    this._blogService.callShowConfirmModalService();
  }

  deleteCategory(): void {
    let categoryId = this.selectedCategory.id;
    this._blogService.deleteBlogCategory(categoryId).subscribe(
      (error) => {},
      () => {
       this.getCategories();
       console.log('deleted');
      }
    );


  }

}
