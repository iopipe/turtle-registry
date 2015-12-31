{
  "listen_port": ${LISTEN_PORT},
  "meta": {
    "neo4j": {
       "url": "${NEO4J_URL}"
    }
  },
  "oauthio": {
    "id": "${OAUTHIO_ID}",
    "private": "${OAUTHIO_PRIVATE}"
  },
  "session": {
    "secret": "${SESSION_KEY}"
  },
  "filestore": "./storage/s3",
  "storage": {
    "s3": {
      "region": "${AWS_REGION}",
      "bucket": "${S3_BUCKET}",
      "access_key": "${AWS_ACCESS_KEY}",
      "secret_key": "${AWS_SECRET_KEY}"
    }
  }
}
