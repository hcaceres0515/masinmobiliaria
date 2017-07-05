
export class Customer {

  //noinspection TsLint
  constructor(
    public id: number,
    public user_id: number,
    public office_id: number,
    public name: string,
    public email: string,
    public first_phone: string,
    public second_phone: string,
    public address: string,
    public createdAt: string,
    //public customer_type: string
    public customerType : CustomerType
  ) {}
}

/* For Customer type
 1 = Seller
 2 = buyer
*/

export class CustomerType {
  constructor(
    public id: number,
    public name: string
  ) {}
}
