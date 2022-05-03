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
    return CodeFile(file_name[6:-3], content)

def read_json_content(file_path):
    file = open(file_path, 'r')
    data_json = json.load(file)
    file.close()
    return data_json


def write_json_content(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def write_file_content(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(data)

code_files_path = {file_path[file_path.rfind('/') + 1:-3]: file_path for file_path in glob.glob("../**/*.gs", recursive = True)}
config = read_json_content('get_content.json')
files = config["files"]

for file in files:
    if file["name"] != 'appsscript':
        write_file_content(code_files_path[file["name"]], file["source"])
