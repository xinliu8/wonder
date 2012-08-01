curl "http://localhost:8983/solr/update/json?commit=true" --data-binary @%1.json -H "Content-type:application/json"
