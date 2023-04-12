GvM6LwAMR7KMwby8


var pipeline=[
    {$sort:{price:1}},
    {$skip:2}
    ]
db.product.aggregate(pipeline);