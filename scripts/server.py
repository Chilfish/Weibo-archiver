from http.server import SimpleHTTPRequestHandler
import socketserver
import logging

class MyHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

    def do_GET(self):
        self.path = '/'  # 将所有的 URL 都映射到主页上
        return SimpleHTTPRequestHandler.do_GET(self)

Handler = MyHandler

socketserver.TCPServer.allow_reuse_address = True

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    with socketserver.TCPServer(("", 8000), Handler) as httpd:
        logging.info("请在浏览器中打开 http://localhost:8000")
        httpd.serve_forever()
except socket.error as e:
    logging.error("服务器启动失败了，因为：", e)