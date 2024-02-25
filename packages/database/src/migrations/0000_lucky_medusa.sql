CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mid` text NOT NULL,
	`text` text NOT NULL,
	`imgs` text NOT NULL,
	`uid` integer NOT NULL,
	`repost_count` integer NOT NULL,
	`comment_count` integer NOT NULL,
	`like_count` integer NOT NULL,
	`created_at` text NOT NULL,
	`ip` text NOT NULL,
	`post_from` text NOT NULL,
	`repost` text,
	`repost_text` text,
	`card` text,
	`comments` text DEFAULT '[]' NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`followers` integer NOT NULL,
	`followings` integer NOT NULL,
	`bio` text NOT NULL,
	`create_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_mid_unique` ON `posts` (`mid`);