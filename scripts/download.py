import requests
import re
import os
import argparse

parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument('-u', '--uid', type=str, default='1111681197', help='用户 UID')
parser.add_argument('-d', '--dir', type=str, default='.', help='图片列表路径')

args = parser.parse_args()

referer = f'https://weibo.com/u/{args.uid}'
imgs_path = os.path.join(args.dir, "imgs.csv")
download_folder = os.path.join(args.dir, './assets/img')

if not os.path.exists(download_folder):
    os.makedirs(download_folder)

with open(imgs_path, 'r', encoding='utf-8') as file:
    text = file.read()
    url_list = text.split(',\n')


def download_file(url, file_path):
    headers = {'Referer': referer}
    response = requests.get(url, headers=headers)
    with open(file_path, 'wb') as f:
        f.write(response.content)

print("开始下载图片，请不要关闭")

for url in url_list:
    try:
        file_name = url.split('/')[-1].split('?')[0]
        prefix = re.match(r"^(?:https?:\/\/)?([^:\/\n]+)", url).group(1)

        file_path = os.path.join(download_folder, prefix + "-" + file_name)
        if not os.path.exists(file_path):
            download_file(url, file_path)
    except Exception as e:
        print(e)

print("下载完成！")
