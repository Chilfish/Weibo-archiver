CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`create_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
