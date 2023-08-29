import http.server
import socketserver

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

Handler = MyHandler

with socketserver.TCPServer(("", 8000), Handler) as httpd:
    print("Serving at port 8000")
    httpd.serve_forever()
