---
resource_id: api
tags: Application Programming Interface
---

## API

You can make a REST request from a Terminal or from any program by sending the right request headers like so

    $ curl -s -H "Content-Type: application/json" -X GET "http://lana.punkish.org/budgets"
    $ curl -s -H "Content-Type: application/json" -X GET "http://lana.punkish.org/budgets?name=<budget_name>"