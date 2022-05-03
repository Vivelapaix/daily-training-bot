#!/usr/bin/python3

import json
import requests
import os
from os import listdir
from os.path import isfile, join
import glob
from collections import namedtuple


CodeFile = namedtuple('CodeFile', ['name', 'code'])


def read_file_content(file_path):
    file = open(file_path, 'r')
    content = file.read()
    file_name = file.name
    file.close()
    last_index = file_name.rfind('/') + 1
    return CodeFile(file_name[last_index:-3], content)

def read_json_content(file_path):
    file = open(file_path, 'r')
    data_json = json.load(file)
    file.close()
    return data_json


def write_json_content(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def get_file_by_name_from_json(source_json = 'get_content.json', file_name_find = 'appsscript'):
    config = read_json_content(source_json)
    script_id = config["scriptId"]
    files = config["files"]
    app_script = ([elem for elem in files if elem["name"] == file_name_find])[0]
    update_files = [app_script]
    code_files = [read_file_content(file_path) for file_path in glob.glob("../**/*.gs", recursive = True)]

    for file in sorted(code_files, key=lambda x: x.name):
        res = app_script.copy()
        res["name"] = file.name
        res["source"] = file.code
        res["type"] = "SERVER_JS"
        update_files.append(res)

    config["files"] = update_files
    return config

result = get_file_by_name_from_json()
print("Go to https://developers.google.com/apps-script/api/reference/rest/v1/projects/updateContent")
print("Copy content from update_content.json and paste it with scriptId = {}".format(result["scriptId"]))
write_json_content('update_content.json', result)