#!/bin/bash

# MongoDB Dev to Main Sync Script
# This will move your development data to your main/production database

# Your dev database connection string
DEV_URI="mongodb+srv://kprijun:6m6xp2ZVXpBvZQ4w@ujalyo.jtsjqdc.mongodb.net/payload-dev?retryWrites=true&w=majority&appName=ujalyo"

# Your main/production database connection string
MAIN_URI="mongodb+srv://kprijun:6m6xp2ZVXpBvZQ4w@ujalyo.jtsjqdc.mongodb.net/payload?retryWrites=true&w=majority&appName=ujalyo"

# Database names
DEV_DB_NAME="payload-dev"
MAIN_DB_NAME="payload"

echo "🚀 Starting MongoDB Dev to Main sync..."
echo "⚠️  WARNING: This will OVERWRITE your main database content with dev database content!"
read -p "Are you sure you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Sync cancelled"
    exit 1
fi

# Create backup directory
mkdir -p ./mongodb-backup

# Export from dev database
echo "📥 Exporting data from dev database (payload-dev)..."
mongodump --uri="$DEV_URI" --out=./mongodb-backup

# Import to main database
echo "📤 Importing data to main database (payload)..."
mongorestore --uri="$MAIN_URI" --drop ./mongodb-backup/$DEV_DB_NAME --nsFrom="$DEV_DB_NAME.*" --nsTo="$MAIN_DB_NAME.*"

echo "✅ Sync completed!"
echo "🔍 Your dev content has been moved to the main database"
echo "💡 You can now switch your .env to use the main database"

# Cleanup
read -p "Delete backup files? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf ./mongodb-backup
    echo "🗑️ Backup files deleted"
fi