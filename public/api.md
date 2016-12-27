You can make a REST request from a Terminal or from any program by sending the right request headers like so

    $ curl -s -H "Content-Type: application/json" -X GET "http://localhost:3000/budgets"
    $ curl -s -H "Content-Type: application/json" -X GET "http://localhost:3000/budgets?name=<budget_name>"