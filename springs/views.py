from django.http import HttpResponse
import urllib2
#from get_data import download_data, download_2
import zipfile
import csv
import json

def index(request):
    return HttpResponse("Hello, world. You're at the springs index.")

def download(request):
    download_data()
    extract_zip()
    return HttpResponse("Hello, world. You're at the springs index.")

def extract_zip():
    zip_ref = zipfile.ZipFile("GWDBDownload.zip", 'r')
    zip_ref.extractall("temp/")
    zip_ref.close()

def get_all_json(request, filename):
    #path = request.path
    #file_name = path.split('/')[-1] + '.txt'
    #convert_to_json('WaterLevelsCombination.txt')
    return HttpResponse(convert_to_json(filename + '.txt'))

def download_data():
    url = "http://www.twdb.texas.gov/groundwater/data/GWDBDownload.zip"

    file_name = url.split('/')[-1]
    u = urllib2.urlopen(url)
    f = open(file_name, 'wb')
    meta = u.info()
    file_size = int(meta.getheaders("Content-Length")[0])
    print "Downloading: %s Bytes: %s" % (file_name, file_size)

    file_size_dl = 0
    block_sz = 8192
    while True:
        buffer = u.read(block_sz)
        if not buffer:
            break

        file_size_dl += len(buffer)
        f.write(buffer)
        status = r"%10d  [%3.2f%%]" % (file_size_dl, file_size_dl * 100. / file_size)
        status = status + chr(8)*(len(status)+1)
        print status,

    f.close()

def convert_to_json(filename):
    csvfile = open('temp/' + filename, 'r')
    jsonfile = open('file.json', 'w')

    reader = csv.DictReader( csvfile, fieldnames=None, delimiter='|')
    json_resp = ''
    for index,row in enumerate(reader):
        if index == 0:
            continue
        json_resp = json_resp + str(row) + ','
	#json.dump(row, jsonfile)
        #json.dump(row, json_resp)
        if index > 0:
            jsonfile.write(',')
        # strip the last hanging comma
        json_resp = json_resp[:-1]
    return '{ "response" = [' + json_resp + ']}'
