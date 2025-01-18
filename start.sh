
# Set the number of browser tabs to open
NUM_TABS=2 #Change this value as needed

cd backend || { echo "Backend folder not found!"; exit 1; }

# Run Go application in the background
echo "Starting backend..."
go run *.go &

BACKEND_PID=$!

# Wait a few seconds to let the server start
sleep 3

# Open the URL in multiple browser tabs
echo "Opening $NUM_TABS browser instances..."
for ((i = 0; i < NUM_TABS; i++)); do
    xdg-open http://127.0.0.1:8080 &
done

# Wait for backend process to finish
wait $BACKEND_PID
