#!/bin/bash

# Check if the prisma/migrations directory exists
if [ -d "./prisma/migrations" ]; then
    echo "Deleting migrations folder..."
    rm -rf ./prisma/migrations
    echo "migrations folder deleted."
else
    echo "No migrations folder found to delete."
fi