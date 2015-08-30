#!/bin/bash

## List widgets
curl http://localhost:3000/api/widget

## Post a new widget
curl -H 'Content-Type: application/json' --data '{"name":"foobar"}' http://localhost:3000/api/widget

## Get widget by id, replace id first
curl http://localhost:3000/api/widget/55e239d38f0c87c806c6e07f

## Modify a widget by id, replace id first
curl  -H 'Content-Type: application/json' -X PUT -d '{"name":"edited"}' http://localhost:3000/api/widget/55e239d38f0c87c806c6e07f

## Delete a widget by id, replace id first
curl -X DELETE http://localhost:3000/api/widget/55e239d38f0c87c806c6e07f