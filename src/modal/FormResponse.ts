export interface FormResponse {
    status: number;
    message: string;
    data: any;
}

export class FormResponseOK implements FormResponse{
    status = 200;
    data: any;
    message = `Success`;
}

export class FormResponseNOK implements FormResponse{
    status = 400;
    data: any;
    message =  `Bad request`;
}

export class FormResponseError implements FormResponse{
    status = 500;
    data: any;
    message = `Internal error`;
}
