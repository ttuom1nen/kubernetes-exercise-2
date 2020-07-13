# Specify two tags, latest and $SHA. SHA is created in travis.yaml
docker build -t ironwagen/multi-client:latest -t ironwagen/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t ironwagen/multi-server:latest -t ironwagen/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t ironwagen/multi-worker -t ironwagen/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push ironwagen/multi-client:latest
docker push ironwagen/multi-server:latest
docker push ironwagen/multi-worker:latest

docker push ironwagen/multi-client:$SHA
docker push ironwagen/multi-server:$SHA
docker push ironwagen/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=ironwagen/multi-server:$SHA
kubectl set image deployments/client-deployments client=ironwagen/multi-client:$SHA
kubectl set image deployments/worker-deployments worker=ironwagen/multi-worker:$SHA