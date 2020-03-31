export class GeneralResponse {

  constructor(public request_id: string = '',
              public result: any = null,
              public message: string = '',
              public error: boolean = false,) {}
}
