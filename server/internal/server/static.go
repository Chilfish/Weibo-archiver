package server

import (
	"net/http"
	"os"
	"path/filepath"
)

func (s *Server) newStaticHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 所有非资源请求都返回index.html
		if filepath.Ext(r.URL.Path) == "" {
			indexPath := filepath.Join(s.config.WebRoot, "index.html")
			if _, err := os.Stat(indexPath); err == nil {
				http.ServeFile(w, r, indexPath)
				return
			}
		}

		// 静态资源请求
		fileServer := http.FileServer(http.Dir(s.config.WebRoot))
		fileServer.ServeHTTP(w, r)
	})
}
