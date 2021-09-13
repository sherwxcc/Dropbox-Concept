# Dropbox Concept

A storage dropbox server with cache.

This application contain a server that can store and retrieve data, when retrieving data it make use of cache to speed up the loading frequency of accessed resources.

## Installation

Please install the node modules dependencies before use.

Install via [npm](https://www.npmjs.com/)

```
$ npm install
```

## How To Use

#### UPLOAD :outbox_tray:

- Click on `Choose a folder` to select your targeted folder from your computer.

- After selection, you will see information including `File Name`, `File Size` and `File Type` displaying under `Selected File:` .

- Click on `Submit` to confirm selection and upload the file.

- An alert will appear if your submission is successful.

- The uploaded file should appear on the `DOWNLOAD` side ready for download.

#### DOWNLOAD :inbox_tray:

- For every uploaded files, there is a `Download` button located at the right of the file name.

- Click on the `Download` button to start downloading your file.

#### DELETE :x:

- If you wish to delete any uploaded file from the server, simply click on the `Delete` button on the right of the file name.
