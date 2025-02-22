package queue

import (
	"sync"
	"time"
)

type PQueue struct {
	concurrency int
	delay       time.Duration
	tasks       chan func() error
	wg          sync.WaitGroup
}

func NewPQueue(concurrency int, delay time.Duration) *PQueue {
	q := &PQueue{
		concurrency: concurrency,
		delay:       delay,
		tasks:       make(chan func() error, concurrency),
	}

	// Start worker goroutines
	for i := 0; i < concurrency; i++ {
		go q.worker()
	}

	return q
}

func (q *PQueue) worker() {
	for task := range q.tasks {
		if q.delay > 0 {
			time.Sleep(q.delay)
		}
		_ = task()
		q.wg.Done()
	}
}

func (q *PQueue) Add(task func() error) {
	q.wg.Add(1)
	q.tasks <- task
}

func (q *PQueue) Wait() {
	q.wg.Wait()
}

func (q *PQueue) Close() {
	close(q.tasks)
}