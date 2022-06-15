export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface Controller {
  handle: (data: HttpRequest) => Promise<HttpResponse>
}
