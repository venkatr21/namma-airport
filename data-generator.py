import json
import requests

f = open('./airport-data.json')
data = json.load(f)

baseUrl = "https://www.bengaluruairport.com"
baseFileName = "./assets/imgs/"


for i in data["places"]:
    r = requests.get(baseUrl+i["logo"]).content
    fileName = i["title"]+".jpg"
    with open(baseFileName+fileName,"wb+") as f:
        f.write(r)
