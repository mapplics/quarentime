export class GeneralResponse {

  constructor(public message: string = '',
              public error: boolean = false,
              public data: any = null) {}
}
