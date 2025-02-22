package server

import (
	"compress/gzip"
	"io"
	"net/http"
	"strings"
	"time"
)

func (s *Server) newImageHandler() http.Handler {
	fileServer := http.FileServer(http.Dir(s.config.ImagesPath))
	
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 设置缓存头
		w.Header().Set("Cache-Control", "public, max-age=3600")
		w.Header().Set("Expires", time.Now().Add(time.Hour).UTC().Format(http.TimeFormat))

		// 检查客户端是否支持gzip
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
			fileServer.ServeHTTP(w, r)
			return
		}

		// 启用gzip压缩
		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		defer gz.Close()

		gzWriter := gzipResponseWriter{Writer: gz, ResponseWriter: w}
		fileServer.ServeHTTP(gzWriter, r)
	})
}

type gzipResponseWriter struct {
	io.Writer
	http.ResponseWriter
}

func (w gzipResponseWriter) Write(b []byte) (int, error) {
	return w.Writer.Write(b)
} 