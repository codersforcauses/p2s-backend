# Deploy using Docker

Make sure you have docker installed first.

## Getting Started

1. Move the files `docker-compose.yml` files outside the backend folder, so the directory tree should look like this:  
root  
|- frontend  
&emsp;|- ...  
|- backend  
&emsp;|- ...  
|- docker-compose.yml  


2. In the root folder, run this command to set the port number before deploying:  
    ```
    export PORT=<port_num>
    ```
3. Build the Docker image (only if there are changes compared to old version, else skip to step 4):

   ```
   docker-compose build --build-arg envvar=<secret> --build-arg host=<host_name> --build-arg port=<port_num> --build-arg db=<db_path>
   ```

4. Start Docker image:

   ```
   docker-compose up
   ```
