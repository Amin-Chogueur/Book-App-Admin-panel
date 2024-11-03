export interface CategoryType {
  _id: string;
  name: string;
}

export interface BookType {
  title: string;
  description: string;
  price: string;
  _id: string;
  image: string;
  quantity: number;
  category: CategoryType;
  auther: string;
}

export interface FormDataType {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
  auther: string;
}
