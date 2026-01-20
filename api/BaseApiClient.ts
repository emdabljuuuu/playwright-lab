import { APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";
import { ApiError } from "./ApiError";

export abstract class BaseApiClient {
  readonly apiRequestContext: APIRequestContext;

  constructor(apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
  }

  protected async get<T>(url: string, schema: z.ZodType<T>): Promise<T> {
    const response = await this.apiRequestContext.get(url);
    this.handleResponse(response);
    const json = await response.json();
    const parsedJson = schema.parse(json);
    return parsedJson;
  }

  protected async post<T>(url: string, data: any, schema: z.ZodType<T>): Promise<T> {
    const response = await this.apiRequestContext.post(url, { data });
    this.handleResponse(response);
    const json = await response.json();
    const parsedJson = schema.parse(json);
    return parsedJson;
  }

  protected async delete<T>(url: string): Promise<T | void> {
    const response = await this.apiRequestContext.delete(url);
    this.handleResponse(response);
    if (response.status() === 204) { // 204 No Content
        console.log('Empty response');
        return;
    }
    const json = await response.json();
    return json;
  }

  private handleResponse(request: APIResponse) {
    if (!request.ok()) {
      throw new ApiError('Error', request.status(), request.url());
    }
  } 

}