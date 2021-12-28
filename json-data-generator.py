import json
import re
f = open('./airport-data.json')
data = json.load(f)

buffer = []
CLEANR = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});|\n')
def cleanhtml(raw_html):
    cleantext = re.sub(CLEANR, '', raw_html)
    return cleantext

for obj in data["places"]:
    name = obj["title"]
    desc = obj["description"]
    type = obj["title"]
    phoneNumbers = obj["phoneNumbers"]
    image = name+'.jpg'
    location = obj["location"]
    contactName = obj["contactName"]
    contactEmail = obj["contactEmail"]
    dic = {
        "name": name,
        "description": cleanhtml(desc),
        "type": type,
        "phoneNumbers": phoneNumbers,
        "image": image,
        "location": location,
        "contactName": contactName,
        "contactEmail": contactEmail
    }
    buffer.append(dic)

jsonContent = { "places": buffer}
json_object = json.dumps(jsonContent, indent=2)

with open("./sample.json", "w") as outfile:
    outfile.write(json_object)
