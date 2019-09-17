@ECHO off

call java -jar swagger-codegen-cli-2.3.0.jar generate -i ../../doc/api-design/api.yaml -l typescript-angular -o ../../api-client -c ./codegen.config

::let formParams: { append(param: string, value: any): void| HttpParams; };
::let formParams: { append(param: string, value: any): void; };
::this.httpClient.get<any>(`${this.basePath}/Background/Img/${encodeURIComponent(String(graphicChartId))}`
:: return this.httpClient.get(`${this.basePath}/Background/Img/${encodeURIComponent(String(graphicChartId))}`,
::             {
::                 withCredentials: this.configuration.withCredentials,
::                 headers: headers,
::                 observe: observe,
::                 responseType: 'arraybuffer',
::                 reportProgress: reportProgress
::             }
::         );