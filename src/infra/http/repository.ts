import { Http } from '.';

export abstract class Repository {
  public http: Http;

  constructor(uri?: string) {
    this.http = new Http(uri);
  }

  public isOK(status: number): boolean {
    return status >= 200 && status < 300;
  }
}
