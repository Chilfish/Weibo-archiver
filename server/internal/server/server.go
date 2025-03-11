package server

import (
	"fmt"
	"net/http"
	"weibo-archiver/internal/config"
)

type Server struct {
	config *config.Config
	mux    *http.ServeMux
}

func New(cfg *config.Config) *Server {
	s := &Server{
		config: cfg,
		mux:    http.NewServeMux(),
	}

	// 注册路由
	s.registerRoutes()
	return s
}

func (s *Server) registerRoutes() {
	// 图片服务
	s.mux.Handle("/images/", http.StripPrefix("/images/", s.newImageHandler()))
	
	// SPA前端服务
	s.mux.Handle("/", s.newStaticHandler())
}

func (s *Server) Start() error {
	port := s.config.Port
	if port == 0 {
		port = 3000
	}

	fmt.Printf("服务器已启动，图片文件夹: %s\n", s.config.ImagesPath)
	fmt.Printf("\t- 图片访问: http://localhost:%d/images/\n", port)
	fmt.Printf("\t- 网页访问: http://localhost:%d\n", port)

	fmt.Println("\n按 Ctrl+C 可停止服务器")

	return http.ListenAndServe(fmt.Sprintf(":%d", port), s.mux)
}
