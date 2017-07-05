
export class Property {

  //noinspection TsLint
  constructor(
    public id: number,
    public user_id: number,
    public username: string,
    public customer_id: number,
    public department_id: number,
    public province_id: number,
    public district_id: number,
    public property_type_id: number,
    public property_status_id: number,
    public property_contract_id: number,
    public property_coin_id: number,
    public customer_name: string,
    public customer_email: string,
    public department_name: string,
    public province_name: string,
    public district_name: string,
    public property_type_name: string,
    public property_status_name: string,
    public property_contract_name: string,
    public property_coin_symbol: string,
    public title: string,
    public description: string,
    public price: string,
    public commission_percentage: string,
    public commission_amount: string,
    public bedrooms: string,
    public bathrooms: string,
    public floors: string,
    public years: string,
    public parkings: string,
    public address: string,
    public reference: string,
    public area: string,
    public lat: string,
    public lng: string,
    public createdAt: string,
    public images: PropertyImage[]
  ){}

}

export class PropertyImage {

  constructor(
    public id: number,
    public src: string,
    public description: string
  ){}
}
