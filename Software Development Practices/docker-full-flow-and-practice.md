# Containers & Docker - Full Classroom Flow

This section contains the complete demonstration flow and student practice. It ends before the recap questions.

## 1. Enter the project folder

Open a terminal in VS Code or PowerShell and move into the folder that contains `server.js`, `package.json`, `Dockerfile`, and `.dockerignore`.

```bash
cd basic-node-server
```

Run the Docker commands from the correct folder. The dot at the end of the build command means: use the current folder as the build context.

## 2. Run the server without Docker

Before using Docker, verify that the application works normally. This helps separate application problems from Docker problems.

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

After the server responds, return to the terminal and stop it with `Ctrl+C`.

## 3. Build the Docker image

Docker reads the `Dockerfile` and builds an image. The image is a reusable template that contains Node.js, the dependencies, and the server code.

```bash
docker build -t basic-docker-server .
```

Command breakdown:

- `docker build` - builds an image.
- `-t basic-docker-server` - gives the image a name.
- `.` - uses the current folder as the build context.

List the local images:

```bash
docker images
```

## 4. Run a container from the image

Create and start a container from the image:

```bash
docker run --name basic-server-container -p 3000:3000 basic-docker-server
```

Important arguments:

- `--name basic-server-container` - gives the container a clear name.
- `-p 3000:3000` - maps port 3000 on the host to port 3000 inside the container.
- `basic-docker-server` - the image used to create the container.

Open:

```text
http://localhost:3000
```

The terminal displays the server logs while the command is running. Stop the process with `Ctrl+C` after testing it.

## 5. Inspect the stopped container

`Ctrl+C` stopped the process, but the container still exists.

```bash
docker ps -a
```

`docker ps` shows only running containers. `docker ps -a` shows running and stopped containers.

## 6. Remove the container

A new container cannot use the same name while the old container still exists.

```bash
docker rm basic-server-container
```

Removing the container does not remove the image. The image can be used again to create another container.

## 7. Run in detached mode

The `-d` option runs the container in the background and returns control of the terminal.

```bash
docker run -d --name basic-server-container -p 3000:3000 basic-docker-server
```

Confirm that it is running:

```bash
docker ps
```

## 8. View container logs

When the container runs in the background, view its logs with:

```bash
docker logs basic-server-container
```

## 9. Stop and remove the container

```bash
docker stop basic-server-container
docker rm basic-server-container
```

`docker stop` stops a running container. `docker rm` removes a stopped container.

## Complete command sequence

```bash
cd basic-node-server
npm install
npm start
# Stop the local server with Ctrl+C

docker build -t basic-docker-server .
docker images
docker run --name basic-server-container -p 3000:3000 basic-docker-server
# Open http://localhost:3000
# Stop the container with Ctrl+C

docker ps -a
docker rm basic-server-container
docker run -d --name basic-server-container -p 3000:3000 basic-docker-server
docker logs basic-server-container
docker stop basic-server-container
docker rm basic-server-container
```

## Student practice

1. Change the text returned by the `/` route in `server.js`.
2. Build the image again with the same `docker build` command.
3. Run a new container from the updated image.
4. Open `http://localhost:3000` and verify that the new text appears.
5. Add a new `/about` endpoint that returns a short message.

```js
app.get("/about", (req, res) => {
  res.send("This server is running inside Docker.");
});
```

After changing the code, remember that the existing container is not updated automatically. Stop and remove it, rebuild the image, and then run a new container.
