import argparse
import base64
import httplib2
import os
import json

from apiclient.discovery import build
from oauth2client.client import GoogleCredentials

import logging
logging.basicConfig(filename='debug.log',level=logging.DEBUG)


API_DISCOVERY_FILE = 'https://vision.googleapis.com/$discovery/rest?version=v1'
http = httplib2.Http()

credentials = GoogleCredentials.get_application_default().create_scoped(['https://www.googleapis.com/auth/cloud-platform'])
credentials.authorize(http)

service = build('vision', 'v1', http, discoveryServiceUrl=API_DISCOVERY_FILE)


homeDir = '/Users/irealva/Google Drive/0.CMU/Semester 2/IACD/TeenieHarris/GoogleVisionAPI/images/'
#rootDir = '/Volumes/IACD_4TB/Teenie_Harris_PNG640'
rootDir = '/Users/irealva/Google Drive/0.CMU/Semester 2/IACD/TeenieHarris/GoogleVisionAPI/test'
for dirName, subdirList, fileList in os.walk(rootDir):
  data = []
  #print('Found directory: %s' % dirName)
  print(os.path.basename(dirName))
  json_name = homeDir + os.path.basename(dirName) + ".json"
  #file = open(json_name, "w")
  with open(json_name, "w") as f:
    for i, fname in enumerate(fileList):
      image_path = os.path.join(dirName, fname)
      if image_path.endswith(".png"):
        print os.path.join(dirName, fname)
        #print('\t%s' % fname)
        with open(image_path, 'rb') as image:
          image_content = base64.b64encode(image.read())
          service_request = service.images().annotate(
            body={
              'requests': [{
                'image': {
                  'content': image_content
                 },
                'features': [{
                  'type': 'LABEL_DETECTION',
                  'maxResults': 20,
                 },
                 {
                  'type': 'TEXT_DETECTION',
                  'maxResults': 20,
                 }]
               }]
            })
          response = service_request.execute()

          #print response
          json_image_name = os.path.basename(dirName) + os.path.basename(image_path)[:-4]
          response["name"] = json_image_name
          #data[json_image_name] =(response)
          data.append(response)
    my_dict = {}
    my_dict.update({"image_labels": data})
    json.dump(my_dict,f, indent=4)
