#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="sdc"
USER="jjones"

# Output Filename for Faker File
OUTPUT="prods.csv"
FILEPATH="$DIR/$OUTPUT"
# if parameter 1 is not passed as argument default records to be generated to 1000000
LINES=${1:-10000000}

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
SCHEMA="../schema.sql"
psql postgres < $SCHEMA

### Run Our Generator Script ###
node dataGen.js --output=$FILEPATH --lines=$LINES

### Import Our posts.csv file to seed Database ###
psql -U jjones -d $DATABASE -c "COPY products (name, description, imageurl, category, isFavorite, price, cutPrice, rating, reviewCount) FROM '$FILEPATH' CSV HEADER";