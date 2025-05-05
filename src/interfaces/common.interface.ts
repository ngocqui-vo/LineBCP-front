import { FieldInputProps, FormikProps } from "formik";

export interface AdditionalFormikProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

export interface CommonPagingParams {
  page?: number;
  pageSize?: number;
}
export interface IRequestParams extends CommonPagingParams {
  user_id: string;
}

export interface CommonResponseAPI<T> {
  statusCode: number;
  messages: string;
  success: boolean;
  data: CommonResponseAPIList<T>;
}

export interface CommonResponseAPIList<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPage: number;
}
