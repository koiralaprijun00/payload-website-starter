#!/bin/bash

# MongoDB Atlas to Local Sync Script
# This will restore your production data to your local development environment

# Your Atlas connection string (production - same as in your .env)
ATLAS_URI="mongodb+srv://kprijun:6m6xp2ZVXpBvZQ4w@ujalyo.jtsjqdc.mongodb.net/payload?retryWrites=true&w=majority&appName=ujalyo"

# Your local MongoDB connection string (using same cluster but different database)
LOCAL_URI="mongodb+srv://kprijun:6m6xp2ZVXpBvZQ4w@ujalyo.jtsjqdc.mongodb.net/payload-dev?retryWrites=true&w=majority&appName=ujalyo"

# Database name
DB_NAME="payload"

echo "🚀 Starting MongoDB Atlas to Local sync..."

# Create backup directory
mkdir -p ./mongodb-backup

# Export from Atlas
echo "📥 Exporting data from MongoDB Atlas..."
mongodump --uri="$ATLAS_URI" --out=./mongodb-backup

# Import to local
echo "📤 Importing data to local MongoDB..."
mongorestore --uri="$LOCAL_URI" --drop ./mongodb-backup/$DB_NAME

echo "✅ Sync completed!"
echo "🔍 Check your local database to verify the data"

# Cleanup
read -p "Delete backup files? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf ./mongodb-backup
    echo "🗑️ Backup files deleted"
fi