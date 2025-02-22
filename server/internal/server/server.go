package server

import (
	"fmt"
	"net/http"
	"strings"
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
	fmt.Printf("服务器已启动在 http://localhost:%d\n", port)
	fmt.Printf("- 图片访问: http://localhost:%d/images/\n", port)
	fmt.Printf("- 网页访问: http://localhost:%d\n", port)

	for {
		err := http.ListenAndServe(fmt.Sprintf(":%d", port), s.mux)
		if err != nil {
			if strings.Contains(err.Error(), "address already in use") {
				fmt.Printf("端口 %d 已被占用，尝试使用 %d...\n", port, port+1)
				port++
				continue
			}
			return fmt.Errorf("服务器启动失败: %w", err)
		}
		break
	}
	return nil
} 