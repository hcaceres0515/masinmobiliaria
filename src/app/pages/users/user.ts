export class User {

  //noinspection TsLint
  constructor(
    public id: number,
    public office_id: number,
    public rol_id: number,
    public name: string,
    public email: string,
    public phone: string,
    public profile_photo: string,
    public profile_icon: string,
    public createdAt: string,
    public path_user_photo: string
  ){}

}
