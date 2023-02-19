FROM mongo:latest

# Check if mongodb.conf file exists
RUN if [ ! -f /etc/mongod.conf ]; then \
      echo "systemLog:\n  destination: file\n  path: /var/log/mongodb/mongod.log\n  logAppend: true\nstorage:\n  dbPath: /data/db\n  journal:\n    enabled: true\n  engine: wiredTiger\n  wiredTiger:\n    collectionConfig:\n      blockCompressor: zlib\n    indexConfig:\n      prefixCompression: true" > /etc/mongod.conf; \
    fi

# Start the MongoDB server with the custom configuration file
CMD ["mongod", "--config", "/etc/mongod.conf"]
