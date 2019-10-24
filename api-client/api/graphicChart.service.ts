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

import { GraphicChartData } from '../model/graphicChartData';
import { GraphicChartList } from '../model/graphicChartList';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GraphicChartService {

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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGraphicChartData(graphicChartId: string, observe?: 'body', reportProgress?: boolean): Observable<GraphicChartData>;
    public getGraphicChartData(graphicChartId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GraphicChartData>>;
    public getGraphicChartData(graphicChartId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GraphicChartData>>;
    public getGraphicChartData(graphicChartId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (graphicChartId === null || graphicChartId === undefined) {
            throw new Error('Required parameter graphicChartId was null or undefined when calling getGraphicChartData.');
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
        ];

        return this.httpClient.get<GraphicChartData>(`${this.basePath}/GraphicChart/${encodeURIComponent(String(graphicChartId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGraphicChartList(observe?: 'body', reportProgress?: boolean): Observable<GraphicChartList>;
    public getGraphicChartList(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GraphicChartList>>;
    public getGraphicChartList(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GraphicChartList>>;
    public getGraphicChartList(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        ];

        return this.httpClient.get<GraphicChartList>(`${this.basePath}/GraphicChart`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param graphicChartId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public rmGraphicChartData(graphicChartId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public rmGraphicChartData(graphicChartId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public rmGraphicChartData(graphicChartId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public rmGraphicChartData(graphicChartId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (graphicChartId === null || graphicChartId === undefined) {
            throw new Error('Required parameter graphicChartId was null or undefined when calling rmGraphicChartData.');
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
        ];

        return this.httpClient.delete<any>(`${this.basePath}/GraphicChart/${encodeURIComponent(String(graphicChartId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param graphicChartData 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveGraphicChartData(graphicChartData: GraphicChartData, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public saveGraphicChartData(graphicChartData: GraphicChartData, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public saveGraphicChartData(graphicChartData: GraphicChartData, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public saveGraphicChartData(graphicChartData: GraphicChartData, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (graphicChartData === null || graphicChartData === undefined) {
            throw new Error('Required parameter graphicChartData was null or undefined when calling saveGraphicChartData.');
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
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<string>(`${this.basePath}/GraphicChart`,
            graphicChartData,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
