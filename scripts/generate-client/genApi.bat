@ECHO off

call java -jar swagger-codegen-cli-2.3.0.jar generate -i ../../doc/api-design/api.yaml -l typescript-angular -o ../../api-client -c ./codegen.config

