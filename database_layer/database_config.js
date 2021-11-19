// MongoDB
MONGO_USER = "user_todo"
MONGO_PASS = "3AudMzCvSGkySEAo"
MONGO_DB = "todo-test"

module.exports = {
    mongodb_url:`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@todo-backend-cluster.by5ic.mongodb.net/${MONGO_DB}`
}
