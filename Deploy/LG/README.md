# Introduction

To use YAAL in a LGTV we only have to deploy YAAL in a webserver, create a web application for LGTVs and deploy it in the TV.

# Instalation instructions

## Deploy YAAL in a webserver

* Read /YAAL/README.md for more information.

## Create a web application to load YAAL in LGTVs

1. Go to LG Developers website: http://developer.lge.com and login
2. Go to Smart TV development: Resource Center > Smart TV
3. Create an App Test: Tab Test > App Test > New App Test
4. Fill the form with this information:
 * App Title: Write a description of the application
 * App Type: Web | Hosted
 * URL: Write here the URL where YAAL is hosted
 * App Icon: Upload an icon for your application
 * Unmark Item
 * Mark **Developer CP Service** and fill information with:
  * Loading Messages: Yes
  * Accept Language: Yes
  * Progress: 95
  * DRM Coookie: Yes
  * Default Language: en
  * Background Color: 1
  * Mouse-off Event: 1
  * Magic RCU: 1
  * Redirection number: 0
5. Click in Save
6. If everything is ok you will see your app created. Click on it.
7. Click on download to get your application package.

## Deploy web application in a LGTV.

1. Pick a USB Stick > format it in FAT32
2. Create folder lgapps/installed
3. Uncompress the file downloaded previously. You will obtain a folder with a long number name.
4. Move the folder inside lgapps/installed
5. Insert the USB Stick in the TV. 

## Execute YAAL in the TV

1. Go to Apps in the USB
2. Click on the icon to launch YAAL

# YAAL Instructions

* Read /YAAL/README.md for more information.