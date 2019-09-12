/**
 * iDatanomics
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class BackgroundService {

    protected basePath = 'http://localhost:5000/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param graphicChartId 
     * @param width 
     * @param height 
     * @param bgSizeOption 
     * @param imgFile 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveBackground(graphicChartId: string, width: number, height: number, bgSizeOption: string, imgFile?: Blob, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public saveBackground(graphicChartId: string, width: number, height: number, bgSizeOption: string, imgFile?: Blob, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public saveBackground(graphicChartId: string, width: number, height: number, bgSizeOption: string, imgFile?: Blob, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public saveBackground(graphicChartId: string, width: number, height: number, bgSizeOption: string, imgFile?: Blob, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (graphicChartId === null || graphicChartId === undefined) {
            throw new Error('Required parameter graphicChartId was null or undefined when calling saveBackground.');
        }
        if (width === null || width === undefined) {
            throw new Error('Required parameter width was null or undefined when calling saveBackground.');
        }
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling saveBackground.');
        }
        if (bgSizeOption === null || bgSizeOption === undefined) {
            throw new Error('Required parameter bgSizeOption was null or undefined when calling saveBackground.');
        }

        let headers = this.defaultHeaders;

        // authentication (basic) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // authentication (oauth) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void| HttpParams; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (imgFile !== undefined) {
            formParams = formParams.append('imgFile', <any>imgFile) || formParams;
        }
        if (graphicChartId !== undefined) {
            formParams = formParams.append('graphicChartId', <any>graphicChartId) || formParams;
        }
        if (width !== undefined) {
            formParams = formParams.append('width', <any>width) || formParams;
        }
        if (height !== undefined) {
            formParams = formParams.append('height', <any>height) || formParams;
        }
        if (bgSizeOption !== undefined) {
            formParams = formParams.append('bgSizeOption', <any>bgSizeOption) || formParams;
        }

        return this.httpClient.post<any>(`${this.basePath}/Background`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
