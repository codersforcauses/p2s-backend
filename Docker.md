# Deploy using Docker

Make sure you have docker installed first.

## Getting Started

1. Move the files `runDockerProd.sh` and `docker-compose.yml` files outside the backend folder, so the directory tree should look like this:  
root  
|- frontend  
&emsp;|- ...  
|- backend  
&emsp;|- ...  
|-runDockerProd.sh  
|-docker-compose.yml  


2. In the root folder, run this command to create a folder for deploying:  
    ```
    sh runDockerProd.sh
    ```
3. Build the Docker image (only if there are changes compared to old version, else skip to step 4):

   ```
   docker-compose build --build-arg envvar=<secret>
   ```

4. Start Docker image:

   ```
   docker-compose up
   ```
